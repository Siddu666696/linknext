"use client"
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import {
  courseId_Query,
  courseMaster_Query,
  getAppliedJobs_Query,
  getCity_Query,
  getEducationList_Query,
  getProfile_Query,
  getQualifications_Query,
  getResume_Query,
  getResumeHeadline_Query,
  getSavedJobs_Query,
  getSkillMaster_Query,
  getSpecialization_Query,
  specializationId_Query,
  universityId_Query,
} from "./query";

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
ConfigureJobseekerAmplify();
const client = generateClient({authMode:"userPool",});

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

export const getCourseMaster = async ({industry="other", qualification }: {industry: string, qualification: string}) => {
  try {
    const response = await client.graphql({
      query: courseMaster_Query,
      variables: {
        industry : industry,
        qualification : qualification
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSpecialization = async ({course, industry="other", qualification, specialization }: {course: object, industry: string, qualification: string, specialization: string}) => {
  try {
    const response = await client.graphql({
      query: getSpecialization_Query,
      variables: {
        course : course,
        industry : industry,
        qualification : qualification,
        specialization : specialization
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUniversityId = async () => {
  try {
    const response = await client.graphql({
      query: universityId_Query,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSkillMaster = async () => {
  try {
    const response = await client.graphql({
      query: getSkillMaster_Query,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// export const getQualifications = async () => {
//   try {
//     const response = await client.graphql({
//       query: getQualifications_Query,
//     });
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// export const getEducationList = async () => {
//   try {
//     const response = await client.graphql({
//       query: courseId_Query,
//     });
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };


