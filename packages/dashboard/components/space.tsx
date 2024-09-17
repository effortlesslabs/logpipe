import { useQuery } from "@apollo/client";
import { GET_SPACE } from "@/graphql/space";

function Space() {
  const { data, loading, error } = useQuery(GET_SPACE, {
    variables: { spaceId: "66e9656d7d998ff29c479bc4" },
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  console.log(data);
  return <div>{data.space.name}</div>;
}

export default Space;
