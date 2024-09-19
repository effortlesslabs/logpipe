import { useQuery } from "@apollo/client";
import { GET_SPACES } from "@/graphql/space";
import { Space as ISpace } from "@/types/space";
import Space from "./space";
import Loader from "./loader";
import Error from "./error";

export default function SpaceList() {
  const { data, loading, error } = useQuery(GET_SPACES);
  return (
    <div className="text-md w-2/3 h-full flex flex-col gap-5">
      <p className="font-semibold">Spaces</p>
      {loading && <Loader />}
      {error && <Error message={error.message} />}
      <div className="w-full grid grid-cols-2 gap-5">
        {!loading &&
          data?.spaces.map((space: ISpace) => (
            <Space key={space.id} space={space} />
          ))}
      </div>
    </div>
  );
}
