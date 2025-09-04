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
export const createProfileSchema = yup.object().shape({
  name: yup.string()
    .required('Full Name is required')
    .min(2, 'Name must be at least 2 characters'),
  
  email: yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  
  phone: yup.string()
    .matches(/^[6-9]\d{9}$/, 'Invalid Indian phone number')
    .required('Phone number is required'),
  
  gender: yup.string().required('Gender is required'),
  
//   workStatus: yup.string().required('Work status is required'),
  
  location: yup.object().shape({
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required')
  }).nullable().required('Location is required'),
  
//   password: yup.string()
//     .min(8, 'Password must be at least 8 characters')
//     .matches(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//       'Password must include uppercase, lowercase, number, and special character'
//     )
//     .required('Password is required'),
  
  isFromOutSideIndia: yup.boolean(),
  
  outComerCountry: yup.string().when('isFromOutSideIndia', {
    is: true,
    then: yup.string().required('Country is required when outside India')
  }),
  
  outComerAddress: yup.string().when('isFromOutSideIndia', {
    is: true,
    then: yup.string().required('Address is required when outside India')
  })
});

export const educationValidationSchema = yup.object().shape({
    qualifications: yup
      .array()
      .of(yup.string())
      .min(1, 'Select at least one qualification')
      .required('Qualifications are required'),
    course: yup.object().required('Course is required'),
    otherCourse: yup.string().when('course', {
      is: 'Other',
      then: yup.string().required('Please specify the course'),
    }),
    specialization: yup.string().required('Specialization is required'),
    otherSpecialization: yup.string().when('specialization', {
      is: 'Other',
      then: yup.string().required('Please specify the specialization'),
    }),
    institute: yup.string().required('Institute name is required'),
    passingYear: yup
      .number()
      .min(1900, 'Invalid passing year')
      .max(new Date().getFullYear(), 'Passing year cannot be in the future')
      .required('Passing year is required'),
    skills: yup
      .array()
      .min(1, 'Select at least one skill')
      .required('Skills are required'),
  });
export const experienceValidationSchema = yup.object().shape({
    experience: yup.string()
    .required('Experience is required')
    .min(2, 'Company Name must be at least 2 characters'),
  
    currentJobRole: yup.string()
    .required('Designation is required')
    .min(2, 'Designation must be at least 2 characters'),
    joiningDate: yup.date()
    .optional()
    .typeError("Please select a valid date")
    .nullable(),
    skills: yup.array()
    .required('Skills are required')
    .min(1, 'Select at least one skill'),

    industry: yup.string()
    .required('Industry is required'),

    otherIndustry: yup.string()
    .required('Industry is required')
    .min(2, 'Industry must be at least 2 characters'),
    department: yup.string()
    .required('Department is required')
    .min(2,'Department must be at least 2 characters'),
    salary: yup.number()
    .nullable()
    .transform((value, originalValue) =>
      originalValue === "" ? null : value
    )
    .integer("Min salary must be an integer")
    .min(100, "Please enter a valid salary"),
});  

export const preferenceSchema = yup.object().shape({
  desiredIndustry: yup.object()
    .nullable()
    .required('Desired industry is required'),
  desiredIndustryOther: yup.string().when('desiredIndustry', {
    is: (val) => val?.industry === 'Other',
    then: yup.string().required('Please specify the industry')
  }),
  desiredRoleCategory: yup.object()
    .nullable()
    .required('Desired role category is required'),
  desiredRoleCategoryOther: yup.string().when('desiredRoleCategory', {
    is: (val) => val?.category === 'Other',
    then: yup.string().required('Please specify the role category')
  }),
  desiredJobType: yup.string().required('Job type is required'),
  desiredShift: yup.string().required('Shift preference is required'),
  desiredEmploymentType: yup.string().required('Employment type is required'),
  preferredWorkLocation: yup.array()
    .of(yup.object())
    .min(1, 'Select at least one work location'),
  availabilityDay: yup.string().required('Availability day is required'),
  availabilityFromTime: yup.string().required('From time is required'),
  availabilityToTime: yup.string().required('To time is required'),
  expectedSalary: yup.array()
    .of(yup.number())
    .length(2, 'Salary range must have two values'),
  communicationPreferences: yup.object().shape({
    email: yup.boolean(),
    phone: yup.boolean(),
    whatsApp: yup.boolean(),
    sms: yup.boolean()
  })
});