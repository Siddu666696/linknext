export const saveJob_Mutation = /* GraphQL */ `
  mutation saveAJob($vacancyID: Int!) {
    saveAJob(vacancyID: $vacancyID)
  }
`;
export const removeJobFromSavedList_Mutation = /* GraphQL */ `
  mutation removeJobFromSavedList($vacancyID: Int!) {
    removeJobFromSavedList(vacancyID: $vacancyID)
  }
`;
export const applyForAJob_Mutation = /* GraphQL */ `
  mutation applyForAJob($vacancyID: Int!) {
    applyForAJob(vacancyID: $vacancyID) 
  }
`;
