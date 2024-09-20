import { gql } from "@apollo/client";
import client from "@/graphql/apollo";
import { Log } from "@/types/log";

export const GET_LOGS = gql`
  query GetLogs($spaceId: ID!) {
    logs(spaceId: $spaceId) {
      id
      message
      level
      createdAt
    }
  }
`;

export async function getLogsApi(spaceId: string): Promise<Log[]> {
  return new Promise((resolve, reject) => {
    client
      .query({
        query: GET_LOGS,
        variables: { spaceId },
        fetchPolicy: "network-only",
      })
      .then((result) => {
        resolve(result.data.logs);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
