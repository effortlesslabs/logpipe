"use client";

import { useQuery } from "@apollo/client";

import { VALIDATE_MAGIC_LINK } from "@/graphql/auth";
import Loader from "./loader";
import Success from "./success";
import Error from "./error";
import { AuthResponse } from "@/types/profile";
import { useProfileStore } from "@/zustand";

export default function Verification({ code }: { code: string }) {
  const { setProfile } = useProfileStore();
  const { data, loading, error } = useQuery(VALIDATE_MAGIC_LINK, {
    variables: { code },
    onCompleted({ validateMagicLink }: { validateMagicLink: AuthResponse }) {
      if (validateMagicLink.jwtToken) {
        setProfile(validateMagicLink.profile);
        localStorage.setItem("jwtToken", validateMagicLink.jwtToken);
        localStorage.setItem(
          "refreshJwtToken",
          validateMagicLink.refreshJwtToken
        );
      }
    },
  });

  return (
    <div className="flex justify-center items-center w-full">
      {loading && <Loader />}
      {!loading && data && <Success />}
      {!loading && error && <Error message={error.message} />}
    </div>
  );
}
