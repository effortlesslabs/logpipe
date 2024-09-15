import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/schema.ts",
  generates: {
    "./src/@generated/resolvers-types.ts": {
      config: {
        federation: true,
        useIndexSignature: true,
        contextType: "../types/context#Context",
      },
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
};

export default config;
