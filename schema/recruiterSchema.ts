import * as yup from "yup";
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email"
    ),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one capital letter")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});
export const signupSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .test("emailOrPhone", "Please enter a valid email ", (value) => {
      // 1. Trim whitespace:
      const trimmedValue = value.trim();

      // 2. Check for email format:
      if (
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(trimmedValue)
      ) {
        return true;
      }

      // 4. Neither email nor phone format is valid:
      return false;
    }),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one capital letter")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export const validationSchema = yup.object().shape({
  industry: yup.object().required("Industry name is required"),
  hospitalName: yup.string().required("Industry name is required"),
  hospitalDisplayName: yup.string().required("Industry name is required"),
  hospitalType: yup.string().when("industry", {
    is: (industry) => industry.industry === "Hospital",
    then: () => yup.string().required("Industry name is required"),
  }),
  location: yup
    .object()
    .shape({
      city: yup.string().required("City is required"),
      state: yup.string().required("State is required"),
    })
    .nullable()
    .required("Location is required"),
  areaName: yup.string().required("Area name is required"),
  pinCode: yup
    .string()
    .required("Pin code is required")
    .matches(/^[0-9]{6}$/, "Pin code must be exactly 6 digits"),
  fullName: yup.string().required("Full name is required"),
  mobile: yup
    .string()
    .required("Contact number is required")
    .matches(/^[0-9]+$/, "Contact number must be numeric")
    .min(10, "Contact number must be at least 10 digits"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  gstNumber: yup
    .string()
    .matches(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{3}$/,
      "Invalid GSTIN format. Ensure it has 15 valid characters."
    )
    .notRequired()
    .nullable(),
  termsConditionAndPrivacy: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
});
export const vacancyValidationSchema = yup.object().shape({
  jobTitle: yup
    .string()
    .required("Job Title is required")
    .min(3, "Job Title must be at least 3 characters"),

  otherJobRole: yup.string().when("jobRole", {
    is: "Other",
    then: yup.string().required("Please specify the job role"),
  }),

  location: yup.string().required("Location is required"),

  qualification: yup.string().required("Qualification is required"),
  skills: yup.string().required("Skills is required"),
  employmentType: yup.string().required("Employment Type is required"),
  jobShift: yup.string().required("Job Shift is required"),
  jobType: yup.string().required("Job Type is required"),
  gender: yup.string().required("Gender is required"),
  department: yup.string().required("Department is required"),

  experienceMin: yup
    .number()
    .min(0, "Minimum experience cannot be negative")
    .max(50, "Maximum experience cannot exceed 50 years")
    .required("Minimum experience is required"),

  experienceMax: yup
    .number()
    .min(
      yup.ref("experienceMin"),
      "Maximum experience must be greater than minimum"
    )
    .max(50, "Maximum experience cannot exceed 50 years")
    .required("Maximum experience is required"),

  lastDateToApply: yup
    .date()
    .min(new Date(), "Last date to apply cannot be in the past")
    .required("Last date to apply is required"),
  fromTime: yup
    .string()
    .test("is-valid-time", "Invalid time format", (value) => {
      if (!value) return true;
      const timeRegex = /^(\w{3}, \d{2} \w{3} \d{4} \d{2}:\d{2}:\d{2} GMT)$/;
      return timeRegex.test(value);
    })
    .transform((value) => {
      if (!value) return undefined;
      const timeRegex = /^(\w{3}, \d{2} \w{3} \d{4} \d{2}:\d{2}:\d{2} GMT)$/;
      if (!timeRegex.test(value)) {
        return undefined;
      }
      return value;
    })
    .required("Time is required")
    .typeError("Invalid Time format"),
  toTime: yup
    .string()
    .test("is-valid-time", "Invalid time format", (value) => {
      if (!value) return true;
      const timeRegex = /^(\w{3}, \d{2} \w{3} \d{4} \d{2}:\d{2}:\d{2} GMT)$/;
      return timeRegex.test(value);
    })
    .transform((value) => {
      if (!value) return undefined;
      const timeRegex = /^(\w{3}, \d{2} \w{3} \d{4} \d{2}:\d{2}:\d{2} GMT)$/;
      if (!timeRegex.test(value)) {
        return undefined;
      }
      return value;
    })
    .required("Time is required")
    .typeError("Invalid Time format"),
  description: yup
    .string()
    .required("Job description is required")
    .min(50, "Job description must be at least 50 characters"),

  salaryRangeMin: yup
    .number()
    .min(0, "Minimum salary cannot be negative")
    .required("Minimum salary is required"),

  salaryRangeMax: yup
    .number()
    .min(
      yup.ref("salaryRangeMin"),
      "Maximum salary must be greater than minimum"
    )
    .required("Maximum salary is required"),

  NotWillingToDisclose: yup.boolean(),
  personName: yup.string().required("Person name is required"),
  phoneNumber: yup
    .string()
    .required("Contact number is required")
    .matches(/^[0-9]+$/, "Contact number must be numeric")
    .min(10, "Contact number must be at least 10 digits"),
  googleMap: yup.string().required("Google Map URL is required"),
  address: yup.string().required("Address is required"),
});
export const signupOtpSchema = yup.object().shape({
  otp: yup
    .string()
    .matches(/^\d+$/, "OTP must be a numeric value")
    .length(6, "OTP must be exactly 6 digits")
    .required("OTP is required"),
});
export const PasswordChangeSchema = yup.object().shape({
  oldpassword: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one capital letter")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
  newpassword: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one capital letter")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
  confirmpassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});
export const kycDetailsSchema = yup.object().shape({
  address: yup.string().required("Address is required"),
  country: yup.string().required("Country is required"),
  state: yup.string().required("State is required"),
  city: yup.string().required("City is required"),
  areaName: yup.string().required("Area Name is required"),
  pinCode: yup
    .string()
    .required("Pin code is required")
    .matches(/^[0-9]{6}$/, "Pin code must be exactly 6 digits"),
  panNumber: yup.string().required("PAN Number is required"),
  gstin: yup
    .string()
    .matches(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{3}$/,
      "Invalid GSTIN format. Ensure it has 15 valid characters."
    )
    .notRequired()
    .nullable(),
});

export const companyDetailsSchema = yup.object().shape({
  industry: yup.object().required("Industry name is required"),
  companyName: yup.string().required("Cmpany Name is required"),
  companyDisplayName: yup.string().required("Company Display Name is required"),
  hospitalType: yup.string().required("Hospital Type is required"),
  recruiterName: yup.string().required("Recruiter Name is required"),
  designation: yup.string().required("Designation is required"),
  contactPerson: yup.string().required("Contact Person Name is  required"),
  website: yup.string().required("Website is required"),
  mobile: yup
    .string()
    .required("Contact number is required")
    .matches(/^[0-9]+$/, "Contact number must be numeric")
    .min(10, "Contact number must be at least 10 digits"),
  alternatemobile: yup
    .string()
    .required("Contact number is required")
    .matches(/^[0-9]+$/, "Contact number must be numeric")
    .min(10, "Contact number must be at least 10 digits"),
});
export const adduserSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email"
    ),
    phone: yup
    .string()
    .required("Contact number is required")
    .matches(/^[0-9]+$/, "Contact number must be numeric")
    .min(10, "Contact number must be at least 10 digits"),
});
export const addfolderSchema = yup.object().shape({
  fullName: yup.string().required("Folder name is required"),
});