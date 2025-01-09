"use client"
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import {
  getAppliedJobs_Query,
  getCity_Query,
  getProfile_Query,
  getResume_Query,
  getResumeHeadline_Query,
  getSavedJobs_Query,
} from "./query";

const client = generateClient({authMode:"userPool",});
export const ConfigureJobseekerAmplify = () => {
  Amplify.configure({
    API: {
      GraphQL: {
        endpoint: process.env.REACT_APP_DOCTORS_FLOW_GRAPHQL_MAIN_URL || "",
        region: "ap-south-1",
        defaultAuthMode: "userPool", 
      },
      
    },
    Auth: {
      Cognito: {
        userPoolId: process.env.REACT_APP_DOCTORS_FLOW_SIGNUP_USERPOOLID || "",
        userPoolClientId:
          process.env.REACT_APP_DOCTORS_FLOW_SIGNUP_CLIENTID || "",
      },
    },
  },{ssr:true});

};

export const getProfile = async () => {
  ConfigureJobseekerAmplify();
  try {
    const response = await client.graphql({
      query: getProfile_Query,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getResume = async () => {
  try {
    const response = await client.graphql({
      query: getResume_Query,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getResumeHeadline = async () => {
  try {
    const response = await client.graphql({
      query: getResumeHeadline_Query,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCity = async () => {
  try {
    const response = await client.graphql({
      query: getCity_Query,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const getAppliedJobs = async () => {
  try {
    const response = await client.graphql({
      query: getAppliedJobs_Query,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getSavedJobs = async () => {
  try {
    const response = await client.graphql({
      query: getSavedJobs_Query,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

