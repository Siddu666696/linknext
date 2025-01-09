import * as yup from "yup";

export const signinSchema = yup.object().shape({
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
    .required("Email/Phone is required")
    .test(
      "emailOrPhone",
      "Please enter a valid email or phone number",
      (value) => {
        // 1. Trim whitespace:
        const trimmedValue = value.trim();

        // 2. Check for email format:
        if (
          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(trimmedValue)
        ) {
          return true;
        }

        // 3. Check for phone number format (Indian 10-digit starting with 6, 7, 8, or 9):
        if (/^[6-9]\d{9}$/.test(trimmedValue)) {
          return true;
        }

        // 4. Neither email nor phone format is valid:
        return false;
      }
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
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});
export const signupOtpSchema = yup.object().shape({
  otp: yup
    .string()
    .matches(/^\d+$/, "OTP must be a numeric value")
    .length(6, "OTP must be exactly 6 digits")
    .required("OTP is required"),
});