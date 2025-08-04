// app/job/[id]/page.tsx
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
// import LoadingSpinner from '@/components/ui/LoadingSpinner';
// import { 
//   getVacancyById, 
//   getSimilarVacancies, 
//   getHospitalDetails, 
//   getHospitalContactDetails,
//   getHospitalImages 
// } from '@/lib/api';
import JobDetailsPage from '@/components/commonComponents/JobDetailsPage';
import { getAVacancy } from '@/lib/api/open/queries/trial';
import { CircularProgress } from '@mui/material';
import { getCurrentUser } from 'aws-amplify/auth';

interface PageProps {
  params: {
    title: string;
    date: string;
    id: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}
type JobDetails = {
  vacancyType: number; // e.g., 1
  vacancyID: string; // e.g., "2354"
  userAddedJobRoleID: number; // e.g., -1
  systemUser: boolean; // e.g., true
  skill: string; // comma-separated list, e.g., "Ultrasound,Radiology,CT Scan"
  secondarySpecialization: string; // can be empty
  savedJob: null | boolean; // can be null or true/false if saved
  qualification: string; // e.g., "Masters/Post-Graduation"
  primarySpecialization: string; // comma-separated list
  postedOn: string; // ISO date string, e.g., "2025-05-30 07:09:29"
  otherJobRole: string; // can be empty
  numberOfVacancies: number; // e.g., 1
  systemUserHospital: string; // can be empty
  minimumSalary: number; // e.g., 150000
  maximumSalary: number; // e.g., 3000000
  logo: string; // URL or empty string
  location: string; // e.g., "Agra, Uttar Pradesh"
  jobRoleID: number; // e.g., 1799
  jobRole: string; // e.g., "Radiologist Doctor"
  lastDateToApply: string; // ISO date string
  isSalaryDisclosed: boolean; // e.g., false
  hospitalName: string | null; // can be null
  hospitalID: string; // UUID
  expiredOn: string; // ISO date string
  expMin: number; // e.g., 0
  expMax: number; // e.g., 2
  employmentType: string; // e.g., "Full Time"
  description: string; // e.g., "krishna diagnostic has a requirement..."
  department: string; // e.g., "Radiology"
  announcedDate: string | null; // can be null
  includeWalkInInterviewDetails: boolean; // e.g., true
  course: string; // e.g., "MD"
  gender: string; // comma-separated list e.g., "male,female"
  shift: string; // e.g., "General"
  status: string; // e.g., "Open"
};


// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const res = await getAVacancy(parseInt(params.id));
    const job= res?.getAVacancy as JobDetails;

    // // Check type of job
    // console.log('Type of job:', typeof job);

    // // Check keys of job
    // console.log('Keys in job:', Object.keys(job));

    // // Check if job has prototype
    // console.log('Has prototype?', Object.getPrototypeOf(job));

    // // Check field directly
    // console.log('job.jobRole:', job.jobRole);
    // console.log('job.location:', job.location);
    // console.log('job.hospitalName:', job.hospitalName);

    const title = `${job.jobRole || job.otherJobRole} job in ${job.location} | MedLink Jobs`;
    const description = `${job.jobRole || job.otherJobRole} position at ${job.hospitalName || ""} in ${job.location}. Apply now for this medical job opportunity.`;

    return {
      title,
      description,
      keywords: [
        job.jobRole,
        job.location,
        job.hospitalName,
        'medical jobs',
        'healthcare careers',
        'MedLink Jobs'
      ].filter(Boolean).join(', '),
      openGraph: {
        title,
        description,
        type: 'website',
        url: `https://www.medlinkjobs.com/job/${job.jobRole}/${job.vacancyID}/${job.postedOn}`,
      },
      robots: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
      alternates: {
        canonical: `https://www.medlinkjobs.com/job/${job.vacancyID}`,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Job Details | MedLink Jobs',
      description: 'Find your next medical career opportunity with MedLink Jobs.',
    };
  }
}

// Data fetching function
async function fetchJobData(vacancyId: string): Promise<object> {
  try {
    // Fetch primary job data
    const [vacancyResponse, userResponse] = await Promise.all([
      getVacancyById(vacancyId),
    ]);

    if (!vacancyResponse.success || !vacancyResponse.data) {
      throw new Error('Job not found');
    }

    const jobDetails = vacancyResponse.data;
    
    // Fetch related data in parallel
    const [
      hospitalResponse,
      hospitalContactResponse,
      hospitalImagesResponse,
      similarJobsResponse,
    ] = await Promise.allSettled([
      getHospitalDetails(jobDetails.hospitalName || ''),
      getHospitalContactDetails(jobDetails.hospitalName || ''),
      getHospitalImages(jobDetails.hospitalName || ''),
      getSimilarVacancies(jobDetails.jobRole, jobDetails.location, 10),
    ]);

    return {
      singleJobDetails: jobDetails,
      hospitalDetails: hospitalResponse.status === 'fulfilled' && hospitalResponse.value.success 
        ? hospitalResponse.value.data 
        : null,
      hospitalContactDetails: hospitalContactResponse.status === 'fulfilled' && hospitalContactResponse.value.success 
        ? hospitalContactResponse.value.data 
        : null,
      allHospitalImages: hospitalImagesResponse.status === 'fulfilled' && hospitalImagesResponse.value.success 
        ? hospitalImagesResponse.value.data 
        : [],
      vacancies: similarJobsResponse.status === 'fulfilled' && similarJobsResponse.value.success 
        ? similarJobsResponse.value.data 
        : [],
      user: userResponse,
    };
  } catch (error) {
    console.error('Error fetching job data:', error);
    throw error;
  }
}

// Main page component
export default async function JobDetailPage({ params }: PageProps) {
  try {
    const data = await getAVacancy(parseInt(params.id));
      

    if (!data.getAVacancy) {
      notFound();
    }

    return (
      <Suspense fallback={<CircularProgress />}>
        <JobDetailsPage 
          singleJobDetails={data?.getAVacancy}
          // vacancyId={params.id}
        />
      </Suspense>
    );
  } catch (error) {
    console.error('Error in JobDetailPage:', error);
    notFound();
  }
}

// Generate static params for ISR (optional)
export async function generateStaticParams() {
  // You can implement this to pre-generate popular job pages
  // For now, we'll use dynamic rendering
  return [];
}

// Revalidate every 5 minutes
export const revalidate = 300;