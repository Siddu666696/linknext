import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import { createJobAlert_Mutation, PreLoginUpdateMutation } from "./mutations";
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
  const userName = data;
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
export const createJobAlert = async (data) => {
  configureUser();
  const {
    emailID,
    deviceToken,
    registered,
    userID,
    education,
    alertName,
    exp,
    hospitals,
    jobType,
    keyword,
    location,
    locationTop,
    maximumSalary,
    minimumSalary,
    profession,
    skill,
    specialization,
  } = data;
  try {
    const response = await client.graphql({
      query: createJobAlert_Mutation,
      variables: {
        emailID: emailID,
        deviceToken: deviceToken,
        registered: registered,
        userID: userID,
        education: education,
        alertName: alertName,
        exp: exp || 0,
        hospitals: hospitals,
        jobType: jobType,
        keyword: keyword,
        location: location,
        locationTop: locationTop,
        maximumSalary: maximumSalary || 9999999,
        minimumSalary: minimumSalary || 0,
        profession: profession,
        skill: skill,
        specialization: specialization,
      },
    });
    return response.data.createJobAlertForUnregisteredUsers;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
