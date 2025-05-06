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
query downloadDocument ($url: String!){
  downloadDocument (url:$url)
}`
;
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