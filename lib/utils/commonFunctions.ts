import { Amplify, ResourcesConfig } from "aws-amplify";

export const configureJobseeker = () => {
  const config: ResourcesConfig["Auth"] = {
    Cognito: {
      userPoolId:
        process.env.REACT_APP_DOCTORS_FLOW_SIGNUP_USERPOOLID ||
        process.env.DOCTORS_FLOW_SIGNUP_USERPOOLID ||
        "",
      userPoolClientId:
        process.env.REACT_APP_DOCTORS_FLOW_SIGNUP_CLIENTID ||
        process.env.DOCTORS_FLOW_SIGNUP_CLIENTID ||
        "",
    },
  };
  if (typeof window !== "undefined") {
    Amplify.configure({ Auth: config }, { ssr: true });
  }
};
export const configureRecruiter = () => {
  const config: ResourcesConfig["Auth"] = {
    Cognito: {
      userPoolId:
        process.env.REACT_APP_HOSPITAL_FLOW_SIGNUP_USERPOOLID ||
        process.env.HOSPITAL_FLOW_SIGNUP_USERPOOLID ||
        "",
      userPoolClientId:
        process.env.REACT_APP_HOSPITAL_FLOW_SIGNUP_CLIENTID ||
        process.env.HOSPITAL_FLOW_SIGNUP_CLIENTID ||
        "",
    },
  };
  if (typeof window !== "undefined") {
    Amplify.configure({ Auth: config }, { ssr: true });
  }
}
export const ExperienceDisplay = ({ expMin, expMax }) => {
  if (expMin === undefined && expMax === undefined) return null;

  const min = expMin ?? 0; // Use nullish coalescing to handle undefined
  const max = expMax ?? 0;

  if (min === 0 && max === 0) return "0 Year";
  if (min === max) return `${min} Year${min > 1 ? 's' : ''}`; // Simplified single year logic
  return `${min} - ${max} Years`; // Simplified range logic
};

export const SalaryDisplay = ({ minimumSalary, maximumSalary, isSalaryDisclosed }) => {
  if (isSalaryDisclosed==="false" || (minimumSalary === 0 && maximumSalary === 0)) return "Not Disclosed";

  const minLakhs = Math.floor(minimumSalary / 12)||0;
  const maxLakhs = Math.floor(maximumSalary / 12)||0;

  if (minLakhs === 0 && maxLakhs > 0) return `₹0 - ₹${maxLakhs} Monthly`;
  return `₹${minLakhs} - ₹${maxLakhs} Monthly`; // Simplified all other cases
};