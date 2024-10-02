import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { Loader as ILoader } from "lucide-react";
import { GET_SPACES } from "@/graphql/space";
import { Space as ISpace } from "@/types/space";
import Space from "./space";
import Loader from "./loader";
import Error from "./error";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SpaceList() {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_SPACES);
  const [buttonLoading, setButtonLoading] = useState(false);

  return (
    <div className="text-md w-full lg:w-2/3 h-full flex flex-col gap-5">
      <p className="font-semibold">Spaces</p>

      {error && <Error message={error.message} />}

      {!loading && data?.spaces.length > 0 ? (
        <div className="w-full grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-5">
          {loading && <Loader />}
          {data.spaces.map((space: ISpace) => (
            <Space key={space.id} space={space} />
          ))}
        </div>
      ) : (
        <Card className="w-full h-full flex flex-col justify-center items-center">
          <CardHeader>
            <CardTitle>No Spaces Found</CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              onClick={() => {
                router.push("/create-space");
                setButtonLoading(true);
              }}
              disabled={buttonLoading}
            >
              {buttonLoading ? (
                <ILoader className="animate-spin" />
              ) : (
                "Create Space"
              )}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
