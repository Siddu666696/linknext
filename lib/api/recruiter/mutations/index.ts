import { generateClient } from "@aws-amplify/api";
import { Amplify } from "aws-amplify";
import {
  addHospital_Mutation,
  addHospitalPicture_Mutation,
  addHRFolder_Mutation,
  deleteDocument_Mutation,
  deleteFolder_Mutation,
  deleteHospitalAsset_Mutation,
  getHospitalPictures_Mutation,
  renameFolder_Mutation,
  sendEmail_Mutation,
  sendOTPToPhone_Mutation,
  updateHospitalAbout_Mutation,
  UpdateHospitalNewsletter_Mutation,
  updateHospitalVideo_Mutation,
  updateProfilePicURL_Mutation,
  uploadDocument_Mutation,
  verifyOTP_Mutation,
} from "./mutations";

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
export const addHospital = async (data) => {
  ConfigureRecruiterAmplify();
  const {
    industry,
    location,
    areaName,
    pinCode,
    fullName,
    mobile,
    gstNumber,
    email,
    hospitalName,
    hospitalDisplayName,
    hospitalType,
    termsConditionAndPrivacy,
  } = data;
  try {
    const response = await client.graphql({
      query: addHospital_Mutation,
      variables: {
        // input:{
        industry: industry,
        cityWithState: location?.cityWithState,
        contactEmail: email,
        contactName: hospitalName,
        contactPhone: mobile,
        locationID: location?.lmID,
        name: hospitalDisplayName,
        // newsletter: ${Boolean(form.promotionoalCommunication)},
        type: hospitalType,
        description: "",
        gstin: gstNumber,
        hciID: industry?.hciID,
        otherIndustry: industry?.industry,
        otherCity: location?.city,
        otherState: location?.state,
        pincode: pinCode,
        profilePicURL: "${url}",
        recruiterName: fullName,
        displayHospitalName: hospitalDisplayName,
        areaName: areaName,
      },
      // }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const uploadDocument = async (data) => {
  ConfigureRecruiterAmplify();
  const { content, fileName, url } = data;
  try {
    const response = await client.graphql({
      query: uploadDocument_Mutation,
      variables: {
        content: content,
        fileName: fileName,
        url: url,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const updateProfilePicURL = async (data) => {
  ConfigureRecruiterAmplify();
  const { profilePictureURL } = data;
  try {
    const response = await client.graphql({
      query: updateProfilePicURL_Mutation,
      variables: {
        profilePictureURL: profilePictureURL,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const deleteDocument = async (data) => {
  ConfigureRecruiterAmplify();
  const url = data;
  try {
    const response = await client.graphql({
      query: deleteDocument_Mutation,
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
export const updateHospitalAbout = async (data) => {
  ConfigureRecruiterAmplify();
  const about = data;
  try {
    const response = await client.graphql({
      query: updateHospitalAbout_Mutation,
      variables: {
        about: about,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getHospitalPictures = async () => {
  ConfigureRecruiterAmplify();
  try {
    const response = await client.graphql({
      query: getHospitalPictures_Mutation,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const addHospitalPicture = async (data) => {
  ConfigureRecruiterAmplify();
  const url = data;
  try {
    const response = await client.graphql({
      query: addHospitalPicture_Mutation,
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
export const deleteHospitalAsset = async (data) => {
  ConfigureRecruiterAmplify();
  const haID = data;
  try {
    const response = await client.graphql({
      query: deleteHospitalAsset_Mutation,
      variables: {
        haID:haID,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const updateHospitalVideo = async (data) => {
  ConfigureRecruiterAmplify();
  const video = data;
  try {
    const response = await client.graphql({
      query: updateHospitalVideo_Mutation,
      variables: {
        video:video,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const sendOTPToPhone = async (data) => {
  ConfigureRecruiterAmplify();
  const phone = data;
  try {
    const response = await client.graphql({
      query: sendOTPToPhone_Mutation,
      variables: {
        phone:phone,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const UpdateHospitalNewsletter = async (data) => {
  ConfigureRecruiterAmplify();
  const {hospitalID,newsletter} = data;
  try {
    const response = await client.graphql({
      query: UpdateHospitalNewsletter_Mutation,
      variables: {
        hospitalID: hospitalID,
        newsletter: newsletter
        
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const verifyOTP = async (data) => {
  ConfigureRecruiterAmplify();
  const {OTP,additionalPhone} = data;
  try {
    const response = await client.graphql({
      query: verifyOTP_Mutation,
      variables: {
        OTP: OTP,
        additionalPhone: additionalPhone
        
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const sendEmail = async (data) => {
  ConfigureRecruiterAmplify();
  const occassion = data;
  try {
    const response = await client.graphql({
      query: sendEmail_Mutation,
      variables: {
        occassion: occassion 
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const addHRFolder = async (data) => {
  ConfigureRecruiterAmplify();
  const name = data;
  try {
    const response = await client.graphql({
      query: addHRFolder_Mutation,
      variables: {
        name: name
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const renameFolder = async (data) => {
  ConfigureRecruiterAmplify();
  const{name,folderID} = data;
  try {
    const response = await client.graphql({
      query: renameFolder_Mutation,
      variables: {
        name: name,
        folderID: folderID
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const deleteFolder = async (data) => {
  ConfigureRecruiterAmplify();
  const folderID = data;
  try {
    const response = await client.graphql({
      query: deleteFolder_Mutation,
      variables: {
        folderID: folderID
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


