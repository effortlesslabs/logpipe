"use client";

import { gql } from "@apollo/client";

export const GET_API_KEYS = gql`
  query getApiKeys {
    getApiKeys {
      keyName
      keyId
    }
  }
`;

export const GENERATE_API_KEY = gql`
  mutation GenerateApiKey($input: ApiKeyInput!) {
    generateApiKey(input: $input) {
      key
      name
    }
  }
`;
