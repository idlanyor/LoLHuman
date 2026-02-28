import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchSwagger, groupOperations, TagGroup, ApiOperation } from '../lib/swagger';

interface ApiDocContextType {
  groups: TagGroup[];
  activeOp: ApiOperation | null;
  setActiveOp: (op: ApiOperation) => void;
  loading: boolean;
}

const ApiDocContext = createContext<ApiDocContextType | undefined>(undefined);

export const ApiDocProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [groups, setGroups] = useState<TagGroup[]>([]);
  const [activeOp, setActiveOp] = useState<ApiOperation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSpec = async () => {
      const spec = await fetchSwagger();
      if (spec) {
        const grouped = groupOperations(spec);
        setGroups(grouped);
        // Default to first operation if nothing active
        if (grouped.length > 0 && grouped[0].operations.length > 0) {
            setActiveOp(grouped[0].operations[0]);
        }
      }
      setLoading(false);
    };
    loadSpec();
  }, []);

  return (
    <ApiDocContext.Provider value={{ groups, activeOp, setActiveOp, loading }}>
      {children}
    </ApiDocContext.Provider>
  );
};

export const useApiDoc = () => {
  const context = useContext(ApiDocContext);
  if (!context) {
    throw new Error('useApiDoc must be used within an ApiDocProvider');
  }
  return context;
};
