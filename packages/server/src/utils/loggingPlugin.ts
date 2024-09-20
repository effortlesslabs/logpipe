import { ApolloServerPlugin } from "@apollo/server";
import { Context } from "../types/context";
import { createLogger } from "@logpipe/logger";

const apiKey = process.env.LOG_PIPE_API_KEY as string;
const logEndpoint = process.env.LOG_PIPE_ENDPOINT as string;

const logger = createLogger({
  level: "info",
  apiKey: apiKey,
  uri: logEndpoint,
});

export default function (): ApolloServerPlugin<Context> {
  return {
    async requestDidStart(requestContext) {
      const { query } = requestContext.request;
      logger.info(`Request started: ${query}`);
    },
    async unexpectedErrorProcessingRequest({ error }) {
      logger.error(`Unexpected error: ${error.message}`);
    },
  };
}
