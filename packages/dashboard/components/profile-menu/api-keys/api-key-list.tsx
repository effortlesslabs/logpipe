"use client";

import { useQuery } from "@apollo/client";
import { GET_API_KEYS } from "@/graphql/api";

function ApiKeyList() {
  const { data, loading, error } = useQuery(GET_API_KEYS);
  return (
    <div className="text-sm w-full h-full flex flex-col gap-2">
      {data?.getApiKeys.map((apiKey: any) => (
        <div className="flex items-center w-full h-10 rounded-md border border-muted-foreground/80 p-2 gap-2">
          {/* TODO : Implement Delete options and Created at options for the list of the api keys
          <Checkbox key={apiKey.id} /> */}
          <label htmlFor="terms">{apiKey.keyName}</label>
        </div>
      ))}
    </div>
  );
}

export default ApiKeyList;
