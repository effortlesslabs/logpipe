import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

const isServer = typeof window === "undefined";

const uri = process.env.NEXT_PUBLIC_LOGPIPE_API_URL || "http://localhost:4000";

const httpLink = createHttpLink({
  uri,
});

const authLink = setContext(async (_, { headers }) => {
  if (isServer) return { headers };
  const token = await localStorage.getItem("jwtToken");
  return {
    headers: {
      ...headers,
      authorization: token,
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(async ({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
      return;
    });
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export default client;
