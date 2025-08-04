// amplify-configs/openUserConfig.ts
import { ResourcesConfig } from 'aws-amplify';

// In Amplify v6, GraphQLAuthMode is a string literal type, not an exported enum
export const openUserConfig: ResourcesConfig = {
  API: {
    GraphQL: {
      endpoint: process.env.REACT_APP_FAQ_FLOW_GRAPHQL_MAIN_URL!,
      region: "ap-south-1",
      defaultAuthMode: "apiKey", // This is already correctly typed in v6
      apiKey: process.env.REACT_APP_FAQ_FLOW_X_API_KEY!,
    },
  },
};
