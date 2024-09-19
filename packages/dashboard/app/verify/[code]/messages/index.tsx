"use client";

import { useQuery } from "@apollo/client";

import { VALIDATE_MAGIC_LINK } from "@/graphql/auth";
import Loader from "./loader";
import Success from "./success";
import Error from "./error";

export default function Verification({ code }: { code: string }) {
  const { data, loading, error } = useQuery(VALIDATE_MAGIC_LINK, {
    variables: { code },
  });

  return (
    <div className="flex justify-center items-center w-full">
      {loading && <Loader />}
      {!loading && data && <Success />}
      {!loading && error && <Error message={error.message} />}
    </div>
  );
}
