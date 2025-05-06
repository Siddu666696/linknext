import { generateClient } from "@aws-amplify/api";
import { Amplify } from "aws-amplify";
import {
  downloadDocument_Query,
  getCityByState_Query,
  getCourse_Query,
  getFolders_Query,
  getHCIIndustry_Query,
  getHospital_Query,
  getHospitalDetails_Query,
  getHospitalTypes_Query,
  getMyProfile_Query,
  getStateMaster_Query,
  searchDepartment_Query,
  searchJobRole_Query,
  searchSkill_Query,
} from "./queries";

const client = generateClient({ authMode: "userPool" });
export const ConfigureRecruiterAmplify = () => {
  Amplify.configure(
    {
      API: {
        GraphQL: {
          endpoint: process.env.REACT_APP_HOSPITAL_FLOW_GRAPHQL_MAIN_URL || "",
          region: "ap-south-1",
          defaultAuthMode: "userPool",
        },
      },
      Auth: {
        Cognito: {
          userPoolId:
            process.env.REACT_APP_HOSPITAL_FLOW_SIGNUP_USERPOOLID || "",
          userPoolClientId:
            process.env.REACT_APP_HOSPITAL_FLOW_SIGNUP_CLIENTID || "",
        },
      },
    },
    { ssr: true }
  );
};
export const getRecruiterProfile = async () => {
  ConfigureRecruiterAmplify();
  try {
    const response = await client.graphql({
      query: getMyProfile_Query,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getHCIIndustry = async () => {
  ConfigureRecruiterAmplify();
  try {
    const response = await client.graphql({
      query: getHCIIndustry_Query,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getHospitalTypes = async () => {
  ConfigureRecruiterAmplify();
  try {
    const response = await client.graphql({
      query: getHospitalTypes_Query,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const searchJobRole = async (data) => {
  ConfigureRecruiterAmplify();
  const role = data;
  try {
    const response = await client.graphql({
      query: searchJobRole_Query,
      variables: {
        role: role,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const searchDepartment = async (data) => {
  ConfigureRecruiterAmplify();
  const name = data;
  try {
    const response = await client.graphql({
      query: searchDepartment_Query,
      variables: {
        name: name,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getCourse = async (data) => {
  ConfigureRecruiterAmplify();
  const qualification = data;
  try {
    const response = await client.graphql({
      query: getCourse_Query,
      variables: {
        qualification: qualification,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const searchSkill = async (data) => {
  ConfigureRecruiterAmplify();
  const skill = data;
  try {
    const response = await client.graphql({
      query: searchSkill_Query,
      variables: {
        skill: skill,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getHospitalDetails = async () => {
  ConfigureRecruiterAmplify();
  try {
    const response = await client.graphql({
      query: getHospitalDetails_Query,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getCityByState = async (data) => {
  ConfigureRecruiterAmplify();
  const [country, state] = data;
  try {
    const response = await client.graphql({
      query: getCityByState_Query,
      variables: {
        country: country,
        state: state,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getStateMaster = async () => {
  ConfigureRecruiterAmplify();
  try {
    const response = await client.graphql({
      query: getStateMaster_Query,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getHospital = async () => {
  ConfigureRecruiterAmplify();
  try {
    const response = await client.graphql({
      query: getHospital_Query,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const downloadDocument = async (data) => {
  ConfigureRecruiterAmplify();
  const url = data;
  try {
    const response = await client.graphql({
      query: downloadDocument_Query,
      variables: {
        url: url,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getFolders = async () => {
  ConfigureRecruiterAmplify();
  try {
    const response = await client.graphql({
      query: getFolders_Query,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};