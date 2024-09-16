import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { connectDatabase } from "./utils/connectDatabase";
import { verifyJwtToken, verifyApiKey } from "./utils/auth";

const mongoDbUri = process.env.MONGO_DB_URI as string;

connectDatabase(mongoDbUri);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const authorization = req.headers?.authorization;
    const apiKey = req.headers?.["x-api-key"] as string;
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
}).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
