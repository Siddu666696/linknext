import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import { checkUserExists_Query, searchCity_Query, sematicSearchJobs_Query } from "./query";
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
// export const sematicSearchJobs = async (data) => {
//   const serverClient = createOpenSSRClient()
//   const { limit, offset, query, sortBy, filters } = data;
//   try {
//     const response = await serverClient.graphql({
//       query: sematicSearchJobs_Query,
//       variables: {
//         limit: limit,
//         offset: offset,
//         query: query,
//         sortBy: sortBy,
//         filters: filters,
//       },
//     });
//     return response.data.sematicSearchJobs;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }
// lib/api.ts (your current file in the lib folder)

// import { type Client } from "aws-amplify/api";
// import { sematicSearchJobs_Query } from "@/graphql/queries"; // Adjust path to your GraphQL queries

// // Define the properties the function expects, including the client
// interface SemanticSearchJobsProps {
//   client: Client;
//   limit: number;
//   offset: number;
//   query: string;
//   sortBy: string;
//   filters: any; // Use a more specific type if possible
// }

export const semanticSearchJobs = async (data) => {
  // DO NOT create a client here. Use the one passed in.
  // const serverClient = createOpenSSRClient() // <-- REMOVE THIS
  
  const { client, limit, offset, query, sortBy, filters } = data;
  
  try {
    // Use the passed-in, context-aware client
    const response = await client.graphql({
      query: sematicSearchJobs_Query,
      variables: {
        limit: limit,
        offset: offset,
        query: query,
        sortBy: sortBy,
        filters: filters,
      },
    });
    
    // The line that previously failed will now work
    return response.data.sematicSearchJobs;
    
  } catch (error) {
    console.error("Error fetching semantic search jobs:", error);
    // Returning null or an empty array is often better for the UI than throwing an error
    return null;
  }
};