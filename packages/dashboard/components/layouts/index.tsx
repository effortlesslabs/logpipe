"use client";

import { ApolloProvider } from "@apollo/client";
import client from "@/graphql/apollo";
import Header from "./header";
import AuthValidator from "../authValidator";

function Layouts({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <div className="relative h-screen flex flex-col">
        <Header />
        <AuthValidator>{children}</AuthValidator>
      </div>
    </ApolloProvider>
  );
}

export default Layouts;
