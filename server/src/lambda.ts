import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { connectDatabase } from "./utils/connectDatabase";

const mongoDbUri = process.env.MONGO_DB_URI as string;

import { startServerAndCreateLambdaHandler, handlers } from "@as-integrations/aws-lambda";

connectDatabase(mongoDbUri);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export const graphqlHandler = startServerAndCreateLambdaHandler(
  server,

  handlers.createAPIGatewayProxyEventRequestHandler()
);
