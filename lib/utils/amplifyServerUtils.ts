// import { createServerRunner } from '@aws-amplify/adapter-nextjs';
// import { ResourcesConfig } from 'aws-amplify';
// // import outputs from '@/amplify_outputs.json';
//   const outputs: ResourcesConfig["Auth"] = {
//     Cognito: {
//       // region: "ap-south-1",
//       userPoolId: process.env.REACT_APP_DOCTORS_FLOW_SIGNUP_USERPOOLID ||process.env.DOCTORS_FLOW_SIGNUP_USERPOOLID || "",
//       userPoolClientId:
//         process.env.REACT_APP_DOCTORS_FLOW_SIGNUP_CLIENTID || process.env.DOCTORS_FLOW_SIGNUP_CLIENTID ||"",
//       // authFlowType: "USER_PASSWORD_AUTH",
//     },
//   };
// export const { runWithAmplifyServerContext } = createServerRunner({
//   config:{Auth: outputs}
// });
import { createServerRunner } from '@aws-amplify/adapter-nextjs';
import { ResourcesConfig } from 'aws-amplify';

// Define proper types for your configuration
interface AuthConfig {
  Cognito: {
    userPoolId: string;
    userPoolClientId: string;
    region?: string;
    authFlowType?: string;
  };
}

// Create configuration with proper type checking
const outputs: AuthConfig["Cognito"] = {
  userPoolId: process.env.REACT_APP_DOCTORS_FLOW_SIGNUP_USERPOOLID || 
              process.env.DOCTORS_FLOW_SIGNUP_CLIENTID || "",
  userPoolClientId: process.env.REACT_APP_DOCTORS_FLOW_SIGNUP_CLIENTID || 
                   process.env.DOCTORS_FLOW_SIGNUP_CLIENTID || "",
};

// Create server runner with proper configuration
export const { runWithAmplifyServerContext } = createServerRunner({
  config: {
    Auth: {
      Cognito: outputs
    }
  }
});

// Add error handling wrapper
export async function withServerContext<T>(
  operation: (context: { contextSpec: any }) => Promise<T>
): Promise<T> {
  try {
    return await runWithAmplifyServerContext({
      nextServerContext: {
        headers: {},
        cookies: {}
      },
      operation
    });
  } catch (error) {
    console.error('Error in server context:', error);
    throw error;
  }
}