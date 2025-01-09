import { createServerRunner } from '@aws-amplify/adapter-nextjs';
import { ResourcesConfig } from 'aws-amplify';
// import outputs from '@/amplify_outputs.json';
  const outputs: ResourcesConfig["Auth"] = {
    Cognito: {
      // region: "ap-south-1",
      userPoolId: process.env.REACT_APP_DOCTORS_FLOW_SIGNUP_USERPOOLID ||process.env.DOCTORS_FLOW_SIGNUP_USERPOOLID || "",
      userPoolClientId:
        process.env.REACT_APP_DOCTORS_FLOW_SIGNUP_CLIENTID || process.env.DOCTORS_FLOW_SIGNUP_CLIENTID ||"",
      // authFlowType: "USER_PASSWORD_AUTH",
    },
  };
export const { runWithAmplifyServerContext } = createServerRunner({
  config:{Auth: outputs}
});