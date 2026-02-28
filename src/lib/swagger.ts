import yaml from 'js-yaml';
import axios from 'axios';

export interface ApiOperation {
  path: string;
  method: string;
  summary?: string;
  description?: string;
  operationId?: string;
  tags?: string[];
  parameters?: any[];
  requestBody?: any;
  responses?: any;
}

export interface TagGroup {
  name: string;
  description?: string;
  operations: ApiOperation[];
}

export const fetchSwagger = async () => {
  try {
    const { data } = await axios.get('/doc'); // Backend serves YAML at /doc
    const parsed = yaml.load(data) as any;
    return parsed;
  } catch (error) {
    console.error('Failed to fetch swagger spec', error);
    return null;
  }
};

export const groupOperations = (spec: any): TagGroup[] => {
  if (!spec || !spec.paths) return [];

  const groups: Record<string, ApiOperation[]> = {};
  const ungrouped: ApiOperation[] = [];

  Object.entries(spec.paths).forEach(([path, methods]: [string, any]) => {
    Object.entries(methods).forEach(([method, operation]: [string, any]) => {
      const apiOp: ApiOperation = {
        path,
        method,
        ...operation,
      };

      if (operation.tags && operation.tags.length > 0) {
        operation.tags.forEach((tag: string) => {
          if (!groups[tag]) groups[tag] = [];
          groups[tag].push(apiOp);
        });
      } else {
        ungrouped.push(apiOp);
      }
    });
  });

  const result: TagGroup[] = Object.keys(groups).map((tag) => ({
    name: tag,
    operations: groups[tag],
  }));

  if (ungrouped.length > 0) {
    result.push({ name: 'General', operations: ungrouped });
  }

  return result;
};
