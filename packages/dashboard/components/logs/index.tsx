// import { useQuery } from "@apollo/client";

// import { GET_LOGS } from "@/graphql/log";
// import { Log } from "@/types/log";
// import LogsTable from "./table/old_index";
import DemoPage from "./table";

function Logs() {
  // const { data, loading, error } = useQuery(GET_LOGS, {
  //   variables: { spaceId: "66e9656d7d998ff29c479bc4" },
  //   fetchPolicy: "cache-and-network",
  // });

  // console.log(data, error);

  // const logs = (data?.logs as Log[]) || [];

  // return <LogsTable loading={loading} logs={logs} error={error} />;
  return <DemoPage />;
}

export default Logs;
