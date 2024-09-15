import { buildSubgraphSchema } from "@apollo/subgraph";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";

import { connectDatabase } from "./utils/connectDatabase";

const mongoDbUri = process.env.MONGO_DB_URI as string;

async function main() {
  await connectDatabase(mongoDbUri);

  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
  });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4004 },
  });

  console.log(`🚀  Subgraph SubGraph Demo ready at ${url}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
