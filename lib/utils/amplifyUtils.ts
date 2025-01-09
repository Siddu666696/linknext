// utils/amplify-utils.ts
import { cookies } from "next/headers";

import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/api";
import { getCurrentUser } from "aws-amplify/auth/server";
import { ResourcesConfig, } from "aws-amplify";

// import { type Schema } from "@aws-amplify/data-schema-types";
// import outputs from "@/amplify_outputs.json";
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
  config: {Auth:outputs},
});

export const cookiesClient = generateServerClientUsingCookies({
  config: {Auth:outputs},
  cookies,
});

export async function AuthGetCurrentUserServer() {
  try {
    const currentUser = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => getCurrentUser(contextSpec),
    });
    return currentUser;
  } catch (error) {
    console.error(error);
  }
}