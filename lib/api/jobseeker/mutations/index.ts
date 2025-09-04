import { generateClient } from "@aws-amplify/api";
import { ConfigureJobseekerAmplify } from "../queries";
import {
  applyForAJob_Mutation,
  removeJobFromSavedList_Mutation,
  saveJob_Mutation,
  updateDb_Mutation,
} from "./mutation";
const client = generateClient({ authMode: "userPool" });

export const saveJob = async (id: number) => {
  ConfigureJobseekerAmplify();
  try {
    const response = await client.graphql({
      query: saveJob_Mutation,
      variables: { vacancyID: id },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const removeJobFromSavedList = async (id: number) => {
  ConfigureJobseekerAmplify();
  try {
    const response = await client.graphql({
      query: removeJobFromSavedList_Mutation,
      variables: { vacancyID: id },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const applyForAJob = async (id: number) => {
  ConfigureJobseekerAmplify();
  try {
    const response = await client.graphql({
      query: applyForAJob_Mutation,
      variables: { vacancyID: id },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const updateDb = async ({phone,phoneVerified,email,emailVerified}:{phone: string,phoneVerified:boolean,email:string,emailVerified:boolean}) => {
  ConfigureJobseekerAmplify();
  try {
    const response = await client.graphql({
      query: updateDb_Mutation,
      variables: {
        phone: phone || "",
        phoneVerified: phoneVerified || false,
        email: email || "",
        emailVerified: emailVerified || false,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
