"use client";

import { ApolloProvider } from "@apollo/client";
import client from "@/graphql/apollo";
import Sidebar from "./sidebar";
import Header from "./header";

function Layouts({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <div className="relative h-screen flex flex-col">
        <Header />
        <div className="flex bg-background flex-grow">
          <Sidebar />
          {children}
        </div>
      </div>
    </ApolloProvider>
  );
}

export default Layouts;
