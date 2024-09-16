import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { connectDatabase } from "./utils/connectDatabase";
import { verifyJwtToken, verifyApiKey } from "./utils/auth";

const mongoDbUri = process.env.MONGO_DB_URI as string;

import {
  startServerAndCreateLambdaHandler,
  handlers,
} from "@as-integrations/aws-lambda";

connectDatabase(mongoDbUri);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export const graphqlHandler = startServerAndCreateLambdaHandler(
  server,
  handlers.createAPIGatewayProxyEventRequestHandler(),
  {
    context: async ({ event }) => {
      const authorization = event.headers?.authorization;
      const apiKey = event.headers?.["x-api-key"];
      if (authorization) {
        const profileId = await verifyJwtToken(authorization);
        return { profileId: profileId };
      } else if (apiKey) {
        const { profileId, spaceId } = await verifyApiKey(apiKey);
        return { profileId, spaceId };
      } else {
        return {};
      }
    },
  }
);
