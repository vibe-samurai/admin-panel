import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'https://inctagram.work/api/v1/graphql',
  documents: ['./src/**/*.{ts,tsx,graphql}', '!**/*.generated.ts'],
  ignoreNoDocuments: true,

  generates: {
    'src/shared/api/types.ts': {
      plugins: ['typescript'],
    },

    'src/': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.ts',
        baseTypesPath: 'shared/api/types.ts',
      },
      plugins: ['typescript-operations', 'typescript-react-apollo'],
      config: {
        withHooks: true,
        withHOC: false,
        withComponent: false,
        preResolveTypes: true,
        dedupeOperationSuffix: true,
      },
    },
  },
}

export default config
