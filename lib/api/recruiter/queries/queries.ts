export const getMyProfile_Query = /* GraphQL */ `
  query MyQuery {
    getMyProfile {
      huID
      email
      phoneNumber
      accessJobPosting
      accessResumeDB
      hospitalID
      adminUser
      name
      status
      systemUser
    }
  }
`;
export const getHCIIndustry_Query = /* GraphQL */ `
  query MyQuery {
    getHCIIndustry {
      hciID
      hciType
      industry
      specialty
      status
    }
  }
`;
export const getHospitalTypes_Query = /* GraphQL */ `
  query MyQuery {
    getHospitalTypes {
      htmID
      type
    }
  }
`;
export const searchJobRole_Query = /* GraphQL */ `
  query searchJobRole($role: String!) {
    searchJobRole(role: $role) {
      dmID
      name
    }
  }
`;
export const searchDepartment_Query = /* GraphQL */ `
  query searchDepartment($name: String!) {
    searchDepartment(name: $name) {
      departmentID
      name
    }
  }
`;
export const getCourse_Query = /* GraphQL */ `
  query getCourse($qualification: String!) {
    getCourse(qualification: $qualification) {
      course
      emID
    }
  }
`;
export const searchSkill_Query = /* GraphQL */ `
  query searchSkill($skill: String!) {
    searchSkill(skill: $skill) {
      name
      skillID
    }
  }
`;
export const getHospitalDetails_Query = /* GraphQL */ `
  query getHospitalDetails {
    getHospitalDetails {
      about
      additionalPhone1
      address
      areaName
      city
      contactPhone
      name
      contactName
      displayHospitalName
      contactPerson
      country
      designation
      gstin
      hospitalID
      hciID
      pan
      KYCstatus
      phoneVerified
      pincode
      profilePicURL
      reportingManager
      role
      state
      video
      website
      locationID
      isOtherCity
      phoneVerified
      additionalPhoneVerified
      freeJobPopupEnabled
    }
  }
`;
export const getCityByState_Query = /* GraphQL */ `
  query getCityByState($country: String!, $state: String!) {
    getCityByState(country: $country, state: $state) {
      city
      lmID
    }
  }
`;
export const getStateMaster_Query = /* GraphQL */ `
  query GetStateMaster {
    getStateMaster(country: "INDIA") {
      state
    }
  }
`;
export const getHospital_Query = /* GraphQL */ `
  query getHospital {
    getHospital {
      type
      taxNumber
      newsletter
      name
      locationID
      location
      hospitalID
      description
      contactPhone
      contactName
      contactEmail
    }
  }
`;
export const downloadDocument_Query = /* GraphQL */ `
  query downloadDocument($url: String!) {
    downloadDocument(url: $url)
  }
`;
export const getFolders_Query = /* GraphQL */ `
  query getFolders {
    getFolders {
      folderID
      name
      profileCount
      userName
    }
    getFolderWiseProfilesCount {
      folderID
      profiles
    }
  }
`;
export const getHospitalUsers_Query = /* GraphQL */ `
  query getHospitalUsers {
    getHospitalUsers {
      email
      huID
      accessJobPosting
      accessResumeDB
      name
      status
      userID
      phoneNumber
    }
  }
`;
export const getPreviousPostedJobsCount_Query = /* GraphQL */ `
  query getPreviousPostedJobsCount($jobRole: String!, $vacancyID: String!) {
    getPreviousPostedJobsCount(jobRole: $jobRole, vacancyID: $vacancyID)
  }
`;
export const getPreviousPostedJobs_Query = /* GraphQL */ `
  query getPreviousPostedJobs(
    $start: Int!
    $count: Int!
    $jobRole: String!
    $vacancyID: String!
  ) {
    getPreviousPostedJobs(
      start: $start
      count: $count
      jobRole: $jobRole
      vacancyID: $vacancyID
    ) {
      RecruiterName
      expMax
      jobRole
      expMin
      location
      vacancyID
      announcedDate
      description
      employmentType
      gender
      includeWalkInInterviewDetails
      locationID
      minimumSalary
      maximumSalary
      postedBy
      numberOfVacancies
      postedOn
      responses
      shift
      status
      teamMedLinkJob
      totalJobs
      userAddedJobRoleID
      vacancyType
    }
  }
`;
export const getJobPostedBy_Query = /* GraphQL */ `
  query getJobPostedBy {
    getJobPostedBy {
      name
      userID
    }
  }
`;
export const getDraftJobCount_Query = /* GraphQL */ `
  query getDraftJobCount {
    getDraftJobCount
  }
`;
export const getDraftPostedBy_Query = /* GraphQL */ `
  query getDraftPostedBy {
    getDraftPostedBy {
      name
      userID
    }
  }
`;
export const getJobStatus_Query = /* GraphQL */ `
  query getJobStatus {
    getJobStatus {
      status
    }
  }
`;
export const getVacanciesByBatch_Query = /* GraphQL */ `
  query getVacanciesByBatch(
    $start: Int!
    $count: Int!
    $jobRole: String!
    $vacancyID: String!
    $sortBy: String!
    $postedByUserID: String!
    $status: String!
  ) {
    getVacanciesByBatch(
      start: $start
      count: $count
      jobRole: $jobRole
      vacancyID: $vacancyID
      sortBy: $sortBy
      postedByUserID: $postedByUserID
      status: $status
    ) {
      location
      postedBy
      vacancyID
      announcedDate
      description
      employmentType
      expMax
      expMin
      gender
      includeWalkInInterviewDetails
      locationID
      maximumSalary
      minimumSalary
      numberOfVacancies
      postedOn
      responses
      shift
      status
      teamMedLinkJob
      userAddedJobRoleID
      vacancyType
      jobRole
    }
  }
`;
export const getJobPostSpecialization_Query = /* GraphQL */ `
  query getJobPostSpecialization($vacancyID: Int!) {
    getJobPostSpecialization(vacancyID: $vacancyID) {
      jpsID
      qualification
      course
      specialization
      vacancyID
      specializationID
    }
  }
`;
export const getJobRoleAndDepartment_Query = /* GraphQL */ `
  query getJobRoleAndDepartment($vacancyID: Int!) {
    getJobRoleAndDepartment(vacancyID: $vacancyID) {
      department
      departmentID
      jobRole
      jobRoleID
    }
  }
`;
export const getDraftJobsByBatch_Query = /* GraphQL */ `
  query getDraftJobsByBatch(
    $start: Int!
    $count: Int!
    $jobRole: String!
    $vacancyID: String!
    $sortBy: String!
    $postedByUserID: String!
  ) {
    getDraftJobsByBatch(
      start: $start
      count: $count
      jobRole: $jobRole
      vacancyID: $vacancyID
      sortBy: $sortBy
      postedByUserID: $postedByUserID
    ) {
       announcedDate
        description
        employmentType
        expMax
        expMin
        gender
        includeWalkInInterviewDetails
        location
        locationID
        maximumSalary
        minimumSalary
        numberOfVacancies
        postedBy
        postedOn
        responses
        shift
        status
        teamMedLinkJob
        userAddedJobRoleID
        vacancyID
        vacancyType
        jobRole
    }
  }
`;
export const getRecruiterProfileStrength_Query = /* GraphQL */ `
  query getRecruiterProfileStrength{
    getRecruiterProfileStrength{
      completed
          strength
    }
  }
`;
export const getActiveSubscriptions_Query = /* GraphQL */ `
  query getActiveSubscriptions{
    getActiveSubscriptions{
     credits
     createdOn
     creditsLeft
     freeCredits
     name
     subtext
     type
     validUpto
    }
  }
`;
