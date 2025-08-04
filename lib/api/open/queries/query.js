export const checkUserExists_Query = /* GraphQL */ `
  query checkUserExists($email: String!) {
    checkUserExists(email: $email)
  }
`;
export const searchCity_Query = /* GraphQL */ `
  query searchCity($city: String!) {
    searchCity(city: $city) {
      city
      cityWithState
      country
      lmID
      state
    }
  }
`;
export const sematicSearchJobs_Query = /* GraphQL */ `
  query sematicSearchJobs(
    $limit: Int!
    $offset: Int!
    $query: String!
    $sortBy: String
    $filters: SearchFilters
  ) {
    sematicSearchJobs(
      limit: $limit
      offset: $offset
      query: $query
      sortBy: $sortBy
      filters: $filters
    ) {
      aggregations {
        Education {
          doc_count
          key
        }
        ExperienceRange {
          avg
          count
          max
          min
          sum
        }
        Hospitals {
          doc_count
          key
        }
        JobType {
          doc_count
          key
        }
        Location {
          doc_count
          key
        }
        SalaryRange {
          avg
          count
          max
          min
          sum
        }
        Skills {
          doc_count
          key
        }
        Specialization {
          doc_count
          key
        }
      }
      jobs {
        city
        closedOn
        course
        department
        description
        employmentType
        expMax
        expMin
        expiredOn
        hospitalAbout
        isSalaryDisclosed
        jobRole
        lastDateToApply
        location
        locationGeo {
          lat
          lon
        }
        logo
        minimumSalary
        maximumSalary
        numberOfVacancies
        postedOn
        primarySpecialization
        qualification
        score
        shift
        skill
        state
        status
        systemUser
        timestamp
        userID
        vacancyID
      }
      total
    }
  }
`;
export const getAVacancy_Query = /* GraphQL */ `
  query getAVacancy($vacancyID: Int!) {
    getAVacancy(vacancyID: $vacancyID) {
      vacancyType
      vacancyID
      userAddedJobRoleID
      systemUser
      skill
      secondarySpecialization
      savedJob
      qualification
      primarySpecialization
      postedOn
      otherJobRole
      numberOfVacancies
      systemUserHospital
      minimumSalary
      maximumSalary
      logo
      location
      jobRoleID
      jobRole
      lastDateToApply
      isSalaryDisclosed
      hospitalName
      hospitalID
      expiredOn
      expMin
      expMax
      employmentType
      description
      department
      announcedDate
      otherJobRole
      includeWalkInInterviewDetails
      course
      gender
      shift
      status
    }
  }
`;
