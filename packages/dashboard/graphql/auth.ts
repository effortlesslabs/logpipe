import { gql } from "@apollo/client";

export const MAGIC_LINK = gql`
  mutation magicLink($email: String!) {
    magicLink(email: $email)
  }
`;

export const VALIDATE_MAGIC_LINK = gql`
  query validateMagicLink($code: String!) {
    magicLink(email: $email) {
      profile {
        id
        name
        email
      }
      jwtToken
      refreshJwtToken
    }
  }
`;
