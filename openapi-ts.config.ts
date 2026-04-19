import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: 'https://raw.githubusercontent.com/benjaminkost/chesshub-core/feature/49/write-openapi-specification/api/src/main/resources/openapi.yaml',
  output: 'src/api/generated',
  plugins: [
    '@hey-api/typescript',
  ],
});
