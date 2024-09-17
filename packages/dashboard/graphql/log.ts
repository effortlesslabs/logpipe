"use client";

import { gql } from "@apollo/client";

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
