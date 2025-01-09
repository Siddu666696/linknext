export const checkUserExists_Query = /* GraphQL */ `
  query checkUserExists($email: String!) {
    checkUserExists(email: $email)
  }
`;