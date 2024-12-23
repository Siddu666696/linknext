import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    REACT_APP_FAQ_FLOW_GRAPHQL_MAIN_URL:
      process.env.REACT_APP_FAQ_FLOW_GRAPHQL_MAIN_URL,
    REACT_APP_FAQ_FLOW_AUTHORITYL:
      process.env.REACT_APP_FAQ_FLOW_AUTHORITYL,
    REACT_APP_FAQ_FLOW_X_API_KEY:
      process.env.REACT_APP_FAQ_FLOW_X_API_KEY,
    REACT_APP_FAQ_FLOW_USER_AGENT:
      process.env.REACT_APP_FAQ_FLOW_USER_AGENT,
  },
  /* config options here */
};

export default nextConfig;
