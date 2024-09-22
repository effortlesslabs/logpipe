"use client";

import { gql } from "@apollo/client";

export const GET_SPACES = gql`
  query GetSpaces {
    spaces {
      id
      name
      description
    }
  }
`;

export const GET_SPACE = gql`
  query GetSpace($spaceId: ID!) {
    space(id: $spaceId) {
      id
      name
      description
    }
  }
`;

export const CREATE_SPACE = gql`
  mutation CreateSpace($input: SpaceInput!) {
    createSpace(input: $input) {
      id
      name
      description
    }
  }
`;

export const DELETE_SPACE = gql`
  mutation DeleteSpace($id: ID!) {
    deleteSpace(id: $id) {
      id
    }
  }
`;

export const UPDATE_SPACE = gql`
  mutation UpdateSpace($id: ID!, $name: String!, $description: String) {
    updateSpace(id: $id, name: $name, description: $description) {
      id
      name
      description
    }
  }
`;
