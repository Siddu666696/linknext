export const addHospital_Mutation = /* GraphQL */ `
  mutation addHospital(
    $name: String!
    $description: String
    $type: String
    $contactName: String!
    $contactPhone: String!
    $contactEmail: String!
    $locationID: Int!
    $newsletter: Boolean
    $cityWithState: String
    $otherState: String
    $otherCity: String
    $areaName: String
    $profilePicURL: String
    $gstin: String
    $pincode: String
    $hciID: Int
    $industry: String
    $otherIndustry: String
    $recruiterName: String
    $displayHospitalName: String
  ) {
    addHospital(
      name: $name
      description: $description
      type: $type
      contactName: $contactName
      contactPhone: $contactPhone
      contactEmail: $contactEmail
      locationID: $locationID
      newsletter: $newsletter
      cityWithState: $cityWithState
      otherState: $otherState
      otherCity: $otherCity
      areaName: $areaName
      profilePicURL: $profilePicURL
      gstin: $gstin
      pincode: $pincode
      hciID: $hciID
      industry: $industry
      otherIndustry: $otherIndustry
      recruiterName: $recruiterName
      displayHospitalName: $displayHospitalName
    )
  }
`;
export const uploadDocument_Mutation = /* GraphQL */ `
  mutation uploadDocument(
    $content: String!
    $fileName: String!
    $url: String!
  ) {
    uploadDocument(content: $content, fileName: $fileName, url: $url)
  }
`;
export const updateProfilePicURL_Mutation = /* GraphQL */ `
  mutation updateProfilePicURL($profilePictureURL: String!) {
    updateProfilePicURL(profilePicURL: $profilePictureURL) {
      about
      additionalPhone1
      profilePicURL
    }
  }
`;
export const deleteDocument_Mutation = /* GraphQL */ `
  mutation deleteDocument($url: String!) {
    deleteDocument(url: $url)
  }
`;
export const updateHospitalAbout_Mutation = /* GraphQL */ `
  mutation updateHospitalAbout($about: String!) {
    updateHospitalAbout(about: $about) {
      about
      hospitalID
    }
  }
`;
export const getHospitalPictures_Mutation = /* GraphQL */ `
  query getHospitalPictures {
    getHospitalPictures {
      haID
      name
      url
    }
  }
`;
export const addHospitalPicture_Mutation = /* GraphQL */ `
  mutation addHospitalPicture($url: String!) {
    addHospitalPicture(url: $url)
  }
`;
export const deleteHospitalAsset_Mutation = /* GraphQL */ `
  mutation deleteHospitalAsset($haID: Int!) {
    deleteHospitalAsset(haID: $haID)
  }
`;
export const updateHospitalVideo_Mutation = /* GraphQL */ `
  mutation updateHospitalVideo($video:String!) {
    updateHospitalVideo(video: $video) {
      about
      hospitalID
      video
    }
  }
`;
export const sendOTPToPhone_Mutation = /* GraphQL */ `
mutation sendOTPToPhone($phone:String!) {
  sendOTPToPhone(phone:$phone)
}`
;
export const UpdateHospitalNewsletter_Mutation = /* GraphQL */ `
mutation UpdateHospitalNewsletter($hospitalID: ID!,$newsletter: Boolean!) {
  UpdateHospitalNewsletter(hospitalID: $hospitalID, newsletter: $newsletter){
  newsletter
  }
}`
;
export const verifyOTP_Mutation = /* GraphQL */ `
mutation verifyOTP($OTP: String!,$additionalPhone: Boolean) {
  verifyOTP(OTP: $OTP, additionalPhone: $additionalPhone)
}`
;
export const sendEmail_Mutation = /* GraphQL */ `
mutation sendEmail($occassion: String!) {
  sendEmail(occassion:$email_occassion)
}`
;
export const addHRFolder_Mutation = /* GraphQL */ `
mutation addHRFolder($name: String!) {
  addHRFolder(name:$name){
  folderID,
  name,
  userName
  }
}`
;
export const renameFolder_Mutation = /* GraphQL */ `
mutation renameFolder($name: String!,$folderID: ID!) {
  renameFolder(name:$name,folderID:$folderID){
  folderID,
  name
  profileCount
  userName
  }
}`
;
export const deleteFolder_Mutation = /* GraphQL */ `
mutation deleteFolder($folderID: ID!) {
  deleteFolder(folderID:$folderID){
  folderID,
  name
  profileCount
  userName
  }
}`
;
export const addHospitalUser_Mutation = /* GraphQL */ `
mutation addHospitalUser($accessJobPosting: Boolean!,$accessResumeDB: Boolean!,$email: String!,$name: String!,$phoneNumber: String!) {
  addHospitalUser(accessJobPosting:$accessJobPosting,accessResumeDB:$accessResumeDB,email:$email,name:$name,phoneNumber:$phoneNumber){
  accessJobPosting
      accessResumeDB
      adminUser
      email
      hospitalID
      huID
      status
      name
      phoneNumber
   }
}`
;
export const updateHospitalUser_Mutation = /* GraphQL */ `
mutation updateHospitalUser($accessJobPosting: Boolean!,$accessResumeDB: Boolean!,$email: String!,$name: String!,$huID: ID!) {
  updateHospitalUser(accessJobPosting:$accessJobPosting,accessResumeDB:$accessResumeDB,email:$email,name:$name,huID: $huID){
  accessJobPosting
    accessResumeDB
    adminUser
    email
    hospitalID
    huID
    name
   }
}`
;
export const deleteHospitalUser_Mutation = /* GraphQL */ `
mutation deleteHospitalUser($huID: ID!) {
  deleteHospitalUser(huID: $huID){
  accessJobPosting
              accessResumeDB
              adminUser
              email
              hospitalID
              huID
              name
   }
}`
;
export const closeJob_Mutation = /* GraphQL */ `
mutation closeJob($vacancyID: Int!) {
  closeJob(vacancyID: $vacancyID)
}`
;
export const removeRecruiterDeviceToken_Mutation = /* GraphQL */ `
mutation removeRecruiterDeviceToken($deviceToken: String!) {
  removeRecruiterDeviceToken(deviceToken: $deviceToken)
}`
;







