import { generateClient } from "@aws-amplify/api";
import { Amplify } from "aws-amplify";
import { getMyProfile_Query } from "./queries";

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
