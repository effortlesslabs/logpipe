import gql from "graphql-tag";

export const typeDefs = gql`
  type Profile {
    id: ID!
    name: String!
    image: String!
    email: String!
  }

  type AuthResponse {
    profile: Profile
    jwtToken: String
    refreshJwtToken: String
  }

  type Space {
    id: ID!
    name: String!
    schema: String!
    description: String
    createdAt: String!
    updatedAt: String!
  }

  type Log {
    id: ID!
    spaceId: ID!
    level: String!
    message: String!
    createdAt: String!
  }

  type ApiKey {
    id: String
    name: String
    key: String
  }

  type ApiKeys {
    spaceName: String
    keyName: String
    keyId: String
  }

  input SpaceInput {
    name: String!
    schema: String
    description: String
  }

  input LogInput {
    level: String!
    message: String!
  }

  input ApiKeyInput {
    spaceId: ID!
    name: String!
  }

  input ProfileInput {
    name: String!
  }

  type Query {
    spaces: [Space!]!
    space(id: ID!): Space
    logs(spaceId: ID!): [Log!]!
    validateMagicLink(code: String!): AuthResponse
    getApiKeys: [ApiKeys!]!
    profile: Profile
    recentLogs: [Log!]!
  }

  type Mutation {
    createSpace(input: SpaceInput!): Space!
    updateSpace(id: ID!, input: SpaceInput!): Space!
    deleteSpace(id: ID!): Space!
    createLog(input: LogInput!): Boolean
    magicLink(email: String!): Boolean!
    generateApiKey(input: ApiKeyInput!): ApiKey!
    refreshJWTToken(refreshToken: String!): AuthResponse
    deleteApiKey(id: String): Boolean
    updateProfile(input: ProfileInput!): Profile
  }
`;
