"use client";

import { ApolloProvider } from "@apollo/client";
import client from "@/graphql/apollo";

function Layouts({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <div className="h-screen px-6 bg-black">{children}</div>
    </ApolloProvider>
  );
}

export default Layouts;
