export const getProfile_Query = /* GraphQL */ `
  query getProfile {
    getProfile {
      userID
      name
      phone
      email
      newsletter
      cityWithState
      phoneVerified
      emailVerified
      exp
      expMonths
      salary
      activelySearching
      profilePicURL
      workStatus
      locationID
      isCurrentlyStduying
      isOutsideIndia
      linkedInURL
      getLocationOutsideIndia {
        area
        country
        loiID
      }
    }
  }
`;

export const getResume_Query = /* GraphQL */ `
  query GetResume {
    getResume {
      filename
      headline
      uploadedAt
      url
      videoURL
    }
  }
`;

export const getResumeHeadline_Query = /* GraphQL */ `
  query GetResumeHeadline {
    getResume {
      headline
    }
  }
`;

export const getCity_Query = /* GraphQL */ `
  query GetCityMaster {
    getCityMaster {
      city
      cityWithState
      lmID
    }
  }
`;

export const getQualifications_Query = /* GraphQL */ `
  query GetQualification {
    getQualification(industry: "Other") {
      qualification
      emID
    }
  }
`;

export const getSkillMaster_Query = /* GraphQL */ `
  query GetSkillMaster {
    getSkillMaster {
      name
      skillID
    }
  }
`;

export const getResumeHeadlineSuggestion_Query = /* GraphQL */ `
  query GetResumeHeadlineSuggestion {
    getResumeHeadlineSuggestion
  }
`;

export const getSkillsList_Query = /* GraphQL */ `
  query GetSkillsList {
    getSkillsList {
      name
    }
  }
`;

export const getInstituteMaster_Query = /* GraphQL */ `
  query GetHealthInstituteMaster {
    getHealthInstituteMaster {
      himID
      name
    }
  }
`;

export const getEducationList_Query = /* GraphQL */ `
  query GetEducationList {
    getEducationList {
      courseName
    }
  }
`;

export const getExperience_Query = /* GraphQL */ `
  query GetExperienceList {
    getExperienceList {
      hospital
    }
  }
`;

export const getMemberships_Query = /* GraphQL */ `
  query GetMemberships {
    getMemberships {
      organization
    }
  }
`;

export const getPersonalDetails_Query = /* GraphQL */ `
  query GetPersonalDetails {
    getPersonalDetails {
      gender
    }
  }
`;

export const getCareerProfilePercentage_Query = /* GraphQL */ `
  query GetCareerProfile {
    getCareerProfile {
      departmentName
    }
  }
`;

export const courseId_Query = /* GraphQL */ `
  query GetCourseMaster {
    getCourseMaster {
      cmID
      name
    }
  }
`;

export const specializationId_Query = /* GraphQL */ `
  query GetSpecializationMaster {
    getSpecializationMaster {
      name
      smID
    }
  }
`;

export const universityId_Query = /* GraphQL */ `
  query GetUniversityMaster {
    getUniversityMaster {
      name
      umID
    }
  }
`;

export const getHCIIndustry_Query = /* GraphQL */ `
  query GetHCIIndustry {
    getHCIIndustry {
      hciID
      industry
      specialty
    }
  }
`;

export const getProfileCourseMaster_Query = /* GraphQL */ `
  query GetProfileCourseMaster {
    getProfileCourseMaster {
      name
      pcmID
    }
  }
`;

export const getEducation_Query = /* GraphQL */ `
  query GetEducationList {
    getEducationList {
      course
      courseType
      eduID
      emID
      healthcareIndustry
      specialization
      qualification
      university
      universityID
      yearOfPassing
      isOtherUniversity
    }
  }
`;

export const getCardEligibleStatus_Query = /* GraphQL */ `
  query GetCardEligibleStatus {
    getCardEligibleStatus {
      isEligible
      isCardCreated
    }
  }
`;

export const savedSkill_Query = /* GraphQL */ `
  query GetSkillsList {
    getSkillsList {
      name
      smID
    }
  }
`;

export const designMaster_Query = /* GraphQL */ `
  query GetDesignationMaster {
    getDesignationMaster {
      dmID
      name
    }
  }
`;

export const hospitalMaster_Query = /* GraphQL */ `
  query GetHospitalMaster {
    getHospitalMaster {
      hmID
      name
    }
  }
`;

export const noticeMaster_Query = /* GraphQL */ `
  query GetNoticePeriodMasters {
    getNoticePeriodMasters {
      npID
      notice
    }
  }
`;

export const getExperienceList_Query = /* GraphQL */ `
  query GetExperienceList {
    getExperienceList {
      currentlyWorking
      description
      designation
      designationID
      employmentType
      expID
      healthInstituteID
      healthInstituteTypeID
      instituteName
      instituteType
      jobType
      noticePeriodID
      startingMonth
      startingYear
      workingMonth
      workingYear
      isOtherSkill
      isOtherIndustry
      isOtherInstitute
      lastWorkingDay
      departmentID
    }
  }
`;

export const getMembership_Query = /* GraphQL */ `
  query GetMemberships {
    getMemberships {
      lifeMembership
      memID
      organization
      positionHeld
    }
  }
`;

export const getPapers_Query = /* GraphQL */ `
  query GetPapers {
    getPapers {
      description
      fileURL
      month
      paperID
      title
      url
      year
      fileName
    }
  }
`;

export const getAwards_Query = /* GraphQL */ `
  query GetAwards {
    getAwards {
      awardID
      description
      month
      name
      url
      year
    }
  }
`;

export const personalDetails_Query = /* GraphQL */ `
  query GetPersonalDetails {
    getPersonalDetails {
      bothAddressSame
      dateofBirth
      differentlyAbled
      gender
      maritalStatus
      pdID
      permanentAddressL1
      permanentAddressL2
      permanentCity
      permanentCountry
      permanentLocationID
      permanentState
      permanentZip
      personalInterest
      presentAddressL1
      presentAddressL2
      presentCity
      presentCountry
      presentLocationID
      presentState
      presentZip
      professionalInterest
      spouseName
      spouseOccupation
      IsOtherPermanentCity
      IsOtherPresentCity
    }
  }
`;

export const languagesKnown_Query = /* GraphQL */ `
  query GetLanguagesKnown {
    getLanguagesKnown {
      language
      lknID
      proficiency
      read
      speak
      write
    }
  }
`;

export const getSavedJobs_Query = /* GraphQL */ `
  query GetSavedJobs {
    getSavedJobs {
      description
      employmentType
      expMax
      expMin
      hospitalID
      isSalaryDisclosed
      lastDateToApply
      location
      maximumSalary
      minimumSalary
      name
      postedOn
      qualification
      savedJob
      vacancyID
      vacancyType
    }
  }
`;

export const departments_Query = /* GraphQL */ `
  query GetDepartments {
    getDepartments {
      departmentID
      name
    }
  }
`;

export const getCareerProfile_Query = /* GraphQL */ `
  query GetCareerProfile {
    getCareerProfile {
      cpID
      departmentName
      desiredEmploymentType
      desiredJobType
      desiredShift
      emailOpted
      smsOpted
      whatsappOpted
      expectedSalaryEnd
      expectedSalaryStart
      industryID
      industryName
      isOtherIndustry
      isOtherRoleCategory
      phoneOpted
      roleCategoryID
      roleCategoryName
      isAnywhereFromIndia
    }
  }
`;

export const getPreferredLocation_Query = /* GraphQL */ `
  query GetPreferredWorkLocation {
    getPreferredWorkLocation {
      cityWithState
      locationID
      pwlID
    }
  }
`;

export const getCandidateAvailability_Query = /* GraphQL */ `
  query GetCandidateAvailability {
    getCandidateAvailability {
      availID
      day
      fromTime
      toTime
    }
  }
`;

export const getHospital_Query = /* GraphQL */ `
  query GetHospital {
    getHospital {
      contactEmail
      contactName
      contactPhone
      hospitalID
      location
      name
      shortName
      taxNumber
      type
    }
  }
`;

export const searchTop4Jobs_Query = /* GraphQL */ `
  query SearchTop4Jobs {
    searchTop4Jobs {
      description
      experience
      employmentType
      hospitalID
      jobTitle
      lastDateToApply
      location
      maximumSalary
      minimumSalary
      name
      postedOn
      qualification
      savedJob
      vacancyID
      vacancyType
    }
  }
`;

export const getJobAlert_Query = /* GraphQL */ `
  query GetAlerts {
    getAlerts {
      alertName
      education
      exp
      hospitals
      jobType
      jsaID
      keyword
      location
      locationTop
      maximumSalary
      minimumSalary
      profession
      specialization
    }
  }
`;

export const getNotificationSettings_Query = /* GraphQL */ `
  query GetNotificationSettings {
    getNotificationSettings {
      communicationEmail
      jobApplied
      newJobAlert
      newRecommendedJob
      profileStrength
      profilePicture
      updateProfile
      uploadResume
      userID
      communicationPush
      jobAppliedPush
      newJobAlertPush
      newRecommendedJobPush
      uploadResumePush
      profileStrengthPush
      profilePicturePush
      updateProfilePush
    }
  }
`;

export const getIndustry_Query = /* GraphQL */ `
  query GetIndustry {
    getIndustry {
      healthcareIndustry
    }
  }
`;

export const getProfileStrength_Query = /* GraphQL */ `
  query GetProfileStrength {
    getProfileStrength {
      strength
    }
  }
`;

export const getNotifications_Query = /* GraphQL */ `
  query GetNotifications {
    getNotifications {
      description
      nID
      status
      title
      createdAt
    }
  }
`;

export const getNotificationCount_Query = /* GraphQL */ `
  query GetNotificationCount {
    getNotificationCount {
      unreadCount
    }
  }
`;

export const addLoginActivity_Query = /* GraphQL */ `
  mutation AddLoginActivity {
    addLoginActivity
  }
`;

export const getStateMaster_Query = /* GraphQL */ `
  query GetStateMaster {
    getStateMaster(country: "INDIA") {
      state
    }
  }
`;

export const getTrendingJobs_Query = /* GraphQL */ `
  query GetTrendingJobs {
    getTrendingJobs {
      announcedDate
      description
      employmentType
      expMax
      expMin
      hospitalID
      isSalaryDisclosed
      lastDateToApply
      location
      maximumSalary
      minimumSalary
      name
      numberOfVacancies
      postedOn
      qualification
      vacancyID
      vacancyType
      logo
    }
  }
`;

export const getAppliedJobs_Query = /* GraphQL */ `
  query GetAppliedJobs {
    getAppliedJobs {
      description
      employmentType
      expMax
      expMin
      hospitalID
      isSalaryDisclosed
      lastDateToApply
      location
      maximumSalary
      minimumSalary
      name
      postedOn
      qualification
      savedJob
      vacancyID
      vacancyType
    }
  }
`;