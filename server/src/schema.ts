import gql from "graphql-tag";

export const typeDefs = gql`
  enum LogLevel {
    INFO
    ERROR
    WARN
    DUBUG
    SILLY
    HTTP
    VERBOSE
  }

  type Profile {
    id: ID!
    name: String!
    image: String!
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
    level: LogLevel!
    message: String!
    createdAt: String!
  }

  input SpaceInput {
    name: String!
    schema: String!
    description: String
  }

  input LogInput {
    spaceId: ID!
    level: LogLevel!
    message: String!
  }

  type Query {
    spaces: [Space!]!
    space(id: ID!): Space
    logs(spaceId: ID!): [Log!]!
    validateMagicLink(code: String): AuthResponse
  }

  type Mutation {
    createSpace(input: SpaceInput!): Space!
    updateSpace(id: ID!, input: SpaceInput!): Space!
    deleteSpace(id: ID!): Space!
    createLog(input: LogInput!): Log!
    magicLink(email: String!): Boolean!
  }
`;
