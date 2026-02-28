import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    output: {
      mode: 'single',
      target: 'src/api/generated.ts',
      client: 'axios',
      override: {
        mutator: {
          path: 'src/api/instance.ts',
          name: 'customInstance',
        },
      },
    },
    input: {
      target: './server/swagger.yaml',
    },
  },
});
