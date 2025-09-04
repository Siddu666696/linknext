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
export const updateDb_Mutation =
  /* GraphQL */
  `
    mutation updateDb(
      $phone: String,
      $phoneVerified: Boolean,
      $email: String,
      $emailVerified: Boolean,
    ) {
      updateDb(
        phone: $phone,
        phoneVerified: $phoneVerified,
        email: $email,
        emailVerified: $emailVerified,
      )
    }
  `;
