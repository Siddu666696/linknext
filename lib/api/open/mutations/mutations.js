export const PreLoginUpdateMutation = /* GraphQL */ `
  mutation preLoginUpdate($userName: String!) {
    preLoginUpdate(userName: $userName)
  }
`;
export const updateDeviceTokenForRecruiter_Mutation = /* GraphQL */ `
  mutation updateDeviceTokenForRecruiter($deviceToken: String!) {
    updateDeviceTokenForRecruiter(deviceToken: $deviceToken)
  }
`;
export const createJobAlert_Mutation = /* GraphQL */ `
  mutation createJobAlertForUnregisteredUsers(
    $emailID: String!,$deviceToken: String!,
    $registered: Boolean!, $userID: String!,$education: String!,
    $alertName: String!, $exp: Int!,$hospitals: String!,
    $jobType: String!, $keyword: String!, $location: String!,$locationTop:String! ,$maximumSalary: Int!,
    $minimumSalary: Int!, $profession: String!, $skill: String!,$specialization: String!) {
             createJobAlertForUnregisteredUsers(
               emailID: $emailID,
               deviceToken:$deviceToken,
               registered: $registered,
               userID: $userID, 
               education: $education,
               alertName: $alertName,
               exp: $exp,
               hospitals:$hospitals ,
               jobType:$jobType ,
               keyword: $keyword,
               location: $location,
               locationTop:$locationTop ,
               maximumSalary: $maximumSalary,
               minimumSalary: $minimumSalary,
               profession:$profession ,
               skill:$skill ,
               specialization: $specialization
             )
           }`;
