import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import { PreLoginUpdateMutation } from "./mutations";
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
export const PreLoginUpdate = async (data) => {
  configureUser();
  const  userName  = data;
  try {
    const response = await client.graphql({
      query: PreLoginUpdateMutation,
      variables: {
        userName: userName,
      },
    });
    return JSON.parse(response.data.preLoginUpdate);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
