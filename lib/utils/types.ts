export type Job = {
  number: string;
  title: string;
  location: string;
};

export type SemanticSearchJobsResponse = {
  sematicSearchJobs: {
    jobs: Job[];
    totalCount: number;
  };
};

type AggregationBuckets ={
	Location: [Bucket]
	SalaryRange: RangeBucket
	ExperienceRange: RangeBucket
	Skills: [Bucket]
	Specialization: [Bucket]
	Hospitals: [Bucket]
	Education: [Bucket]
	JobType: [Bucket]
}

type Bucket ={
	key: string
	doc_count: number
}

type CareerProfile ={
	cpID: number!
	userID: number!
	industryID: number
	roleCategoryID: number
	desiredJobType: string
	desiredShift: string
	desiredEmploymentType: string
	expectedSalaryStart: number
	expectedSalaryEnd: number
	departmentName: string
	emailOpted: boolean
	phoneOpted: boolean
	industryName: string
	roleCategoryName: string
	isAnywhereFromIndia: boolean
	whatsappOpted: boolean
	smsOpted: boolean
}

type CourseMaster ={
	cmID: number!
	name: string!
	specialisation: string
}

type DailyProfileReminder ={
	deviceToken: string
	userID: string
	hospitalID: string
	name: string
	recruiterName: string
	jobSeekerUserID: string
	email: string
}

type DepartmentMaster ={
	departmentID: number
	department: string!
}

type DesignationMaster ={
	dmID: number
	jobRole: string
}

// enum Device = {}
// 	web
// 	ios
// 	android
// }

type Education ={
	eduID: number!
	courseType: string!
	yearOfPassing: string!
	emID: number!
	qualification: string!
	healthcareIndustry: string!
	course: string!
	specialization: string!
	university: string!
	universityID: number!
}

type EducationMaster ={
	emID: number!
	healthcareIndustry: string
	qualification: string
	course: string
	specialization: string
}

type Experience ={
	expID: number!
	designationID: number!
	designation: string!
	healthInstituteID: number!
	healthInstituteTypeID: number!
	instituteName: string!
	instituteType: string!
	currentlyWorking: boolean!
	jobType: string!
	workingYear: number!
	workingMonth: number!
	startingYear: number!
	startingMonth: number!
	description: string!
	employmentType: string!
	noticePeriodID: number!
	skillID: string
	skill: string
	department: string
}

type FAQ ={
	faqID: number!
	title: string!
	description: string!
}

type FeaturedHospital ={
	profilePicURL: string
	name: string!
	jobsPosted: number
}

type GeoLocation ={
	lat: number
	lon: number
}

type GeoLocationFilter ={
	lat: number!
	lon: number!
	distance: string!
}

type HCIMaster ={
	hciID: number!
	industry: string!
	specialty: string!
	hciType: string
	status: string
}

type Hospital ={
	hospitalID: number!
	name: string!
	description: string!
	googlePlaceID: string!
	type: string!
	contactName: string!
	contactPhone: string!
	contactEmail: string!
	taxNumber: string!
	latitude: string!
	longitude: string!
	locationTypes: AWSJSON
}

type HospitalAsset ={
	haID: number
	type: string
	url: string
	name: string
}

type HospitalContact ={
	hospitalName: string
	contactPersonName: string
	contactPersonEmail: string
	contactPersonPhone: string
	contactPersonDesignation: string
	logoURL: string
	aboutHospital: string
}

type HospitalDetails ={
	hospitalID: string!
	about: string
	video: string
	role: string
	reportingManager: string
	mobile: string
	companyType: string
	industryType: string
	contactPerson: string
	designation: string
	website: string
	additionalPhone1: string
	additionalPhone2: string
	pan: string
	address: string
	country: string
	state: string
	city: string
	pincode: string
	gstin: string
	name: string
	profilePicURL: string
}

type HospitalNameLogo ={
	name: string
	profilePicURL: string
}

type InterviewDetails ={
	startDate: string
	endDate: string
	startTime: string
	endTime: string
	contactPersonName: string
	contactPersonPhone: string
	address: string
	googleMapURL: string
}

type JobData ={
	vacancyID: number
	userID: string
	jobTitle: string
	employmentType: string
	isSalaryDisclosed: boolean
	expMin: number
	expMax: number
	lastDateToApply: string
	postedOn: string
	status: string
	description: string
	hospitalID: string
	minimumSalary: number
	maximumSalary: number
	closedOn: string
	expiredOn: string
	qualification: string
	city: string
	location: string
	hospitalName: string
	primarySpecilization: string
	hospitalAbout: string
	logo: string
	announcedDate: string
	systemUserHospital: string
}

type JobPostSkill ={
	jpsID: number!
	userID: number!
	hospitalID: number!
	vacancyID: number!
	skillID: number!
	skill: string!
}

type JobPostSpecialization ={
	jpsID: number!
	vacancyID: number!
	specializationID: number!
	specialization: string!
	course: string!
	qualification: string!
}

type JobResult ={
	vacancyID: number
	numberOfVacancies: number
	userID: string
	expiredOn: string
	jobRole: string
	description: string
	logo: string
	city: string
	state: string
	lastDateToApply: string
	qualification: string
	shift: string
	minimumSalary: number
	maximumSalary: number
	expMin: number
	expMax: number
	status: string
	closedOn: string
	systemUser: string
	isSalaryDisclosed: string
	primarySpecialization: string
	skill: string
	postedOn: string
	course: string
	department: string
	timestamp: string
	employmentType: string
	hospitalAbout: string
	location: string
	locationGeo: GeoLocation
	score: number
}

type JobRoleAndDepartment ={
	jobRole: string
	department: string
}

type JobSeeker ={
	userID: string!
	email: string
	deviceToken: string
	workStatus: string
}

type JobSeekerData ={
	userID: number!
	name: string!
	phone: string
	newsletter: boolean
	cityWithState: string
	city: string
	state: string
	phoneVerified: boolean
	exp: number
	expMonths: number
	salary: number
	salaryThousands: number
	activelySearching: boolean
	profilePicURL: string
	fresherIndustry: string
	fresherSpecialty: string
	industryID: number
	specialtyID: number
	workStatus: string
	experiencedType: string
	joiningMonth: number
	joiningYear: number
	industry: string
	specialty: string
	lastLogin: string
	createdAt: string
	updatedAt: string
	personalDetails: PersonalDetails
	careerProfile: CareerProfile
	education: [Education]
	experience: [Experience]
	resume: Resume
	email: string
	University: string
	otherUniversity: string
	qualification: string
	course: string
	desiredIndustry: string
	desiredEmploymentType: string
	expectedSalaryStart: number
	expectedSalaryEnd: number
	desiredShift: string
	emailVerified: boolean
	hasFresherExperience: boolean
	isCurrentlyStduying: boolean
	isOutsideIndia: boolean
	fresherIndustryID: number
	fresherSpecializationID: number
}

type JobViewCount ={
	jvcID: number!
	vacancyID: number!
	device: string!
	count: number!
}

type KYCStatus ={
	KYCstatus: string
	hospitalID: string
}

type LocationMaster ={
	lmID: number!
	city: string!
	country: string!
	state: string!
	cityWithState: string
}

type LogoutRes ={
	deviceToken: string
}

type Notification ={
	userID: string
	count: number
	nID: number!
	title: string!
	description: string!
	status: string!
	createdAt: string!
	redirectTo: string!
}

type PersonalDetails ={
	pdID: number!
	userID: number!
	dateofBirth: AWSDate!
	maritalStatus: string
	gender: string!
	differentlyAbled: boolean
	spouseName: string
	spouseOccupation: string
	presentAddressL1: string
	presentAddressL2: string
	presentCity: string
	presentState: string
	presentZip: number
	presentCountry: string
	permanentAddressL1: string
	permanentAddressL2: string
	permanentCity: string
	permanentState: string
	permanentZip: number
	permanentCountry: string
	bothAddressSame: boolean
	professionalInterest: string
	personalInterest: string
	presentLocationID: number
	permanentLocationID: number
}

type ProfileReminder ={
	prID: number!
	userID: string!
	reminderOn: string
	hospitalID: string!
	reminderBy: string!
	isDisabled: boolean!
	isTriggered: boolean!
	isRead: boolean
	reminderSetter: string!
	userName: string!
	title: string!
}

type ProfileStrength ={
	strength: number
}

type RangeBucket ={
	count: number
	min: number
	max: number
	avg: number
	sum: number
}

type RangeFilter ={
	min: number
	max: number
}

type RangeInput ={
	min: number
	max: number
}

type Recruiter ={
	name: string
	companyName: string
	industry: string
	about: string
	email: string
	phone: string
	address: string
}

type RecruiterNotification ={
	userID: string!
	hospitalID: string!
	title: string!
	description: string!
	rnID: number!
	redirectTo: string!
	type: string!
	isRead: boolean
	createdAt: string!
	vacancyID: number
}

type RegAssistance ={
	raID: string
	phoneNumber: string
}

type Resume ={
	userID: string!
	url: string
	headline: string
	uploadedAt: AWSDate
	videoURL: string
}

type SearchFilters ={
	location: string
	salaryRange: RangeInput
	experienceRange: RangeInput
	jobType: string
	education: string
	specialization: string
	skills: string
	hospital: string
}

export type SemanticJobSearchResponse ={
	jobs: [JobResult]
	total: number
	aggregations: AggregationBuckets
}

type ServicePlan ={
	spID: number!
	price: number!
	name: string!
	subtext: string!
	recommended: boolean!
	features: string!
	validity: number!
	terms: string!
	taxRate: number!
}

type SkillMaster ={
	skillID: number
	skill: string
}

type TopHospital ={
	hospitalName: string
	city: string
	state: string
	imageURL: string
}

type UserAddedJobRole ={
	uajrID: number
	jobRole: string
}

type UserData ={
	userID: string
	token: [token]
}

type Vacancy ={
	vacancyID: number!
	location: string
	expMin: number
	lastDateToApply: string
	expMax: number
	qualification: string
	employmentType: string
	isSalaryDisclosed: boolean
	description: string
	minimumSalary: number
	maximumSalary: number
	vacancyType: number
	postedOn: string
	savedJob: string
	hospitalID: string
	name: string
	systemUser: boolean
	announcedDate: AWSDate
	numberOfVacancies: number
	expiredOn: string
	includeWalkInInterviewDetails: boolean
	jobRoleID: number
	userAddedJobRoleID: number
	logo: string
	jobRole: string
	otherJobRole: string
	department: string
	primarySpecialization: string
	secondarySpecialization: string
	skill: string
	hospitalName: string
	course: string
	teamMedLinkJob: boolean
	shift: string
	gender: string
	systemUserHospital: string
	status: string
}

export type Blog ={
	blogId: number
	title: string
	briefDescription: string
	category: string
	imageLink: string
	description: string
	relatedBlogs: [Blog]
	keywords: string
}

type cognitostat ={
	AllCognitoUsers: string
	confirmedUnregistered: string
	unconfirmed: string
	batch: number
	totalBatch: number
}

type token ={
	token: string
}
