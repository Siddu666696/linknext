export const checkUserExists_Query = /* GraphQL */ `
  query checkUserExists($email: String!) {
    checkUserExists(email: $email)
  }
`;
export const searchCity_Query = /* GraphQL */ `
  query searchCity($city:String!) {
  searchCity(city: $city) {
    city
    cityWithState
    country
    lmID
    state
  }
}
`;