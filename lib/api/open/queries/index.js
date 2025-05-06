import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import { checkUserExists_Query, searchCity_Query } from "./query";
const client = generateClient();
const configureUser = () => {
  Amplify.configure({
    API: {
      GraphQL: {
        endpoint: process.env.REACT_APP_FAQ_FLOW_GRAPHQL_MAIN_URL,
        region: "ap-south-1",
        defaultAuthMode: "apiKey",
        apiKey: process.env.REACT_APP_FAQ_FLOW_X_API_KEY,
        authority: process.env.REACT_APP_FAQ_FLOW_AUTHORITYL,
      },
    },
  });
};
export const checkUserExists = async (data) => {
  configureUser();
  const email = data;
  try {
    const response = await client.graphql({
      query: checkUserExists_Query,
      variables: {
        email: email,
      },
    });
    return response.data.checkUserExists;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const searchCity = async (data) => {
  configureUser();
  const city = data;
  try {
    const response = await client.graphql({
      query: searchCity_Query,
      variables: {
        city: city,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
