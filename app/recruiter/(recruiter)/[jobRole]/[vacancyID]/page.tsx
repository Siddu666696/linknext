
"use client"
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { CircularProgress } from "@mui/material";
import { getAVacancy } from "@/lib/api/recruiter/queries";

interface PageProps {
  params: {
    jobRole: string;
    vacancyID: string;
  };
}

export default  function ApplicantDetails({ params }: PageProps) {
  try {
    const fetchVacancy = async( vacancyID) => {
    const data = getAVacancy(Number(vacancyID));
console.log(data,"lll");
 if (!data?.getAVacancy) {
      notFound();
    }
return data;

    }
fetchVacancy(params.vacancyID);
   

    return (
      <Suspense fallback={<CircularProgress />}>
        <ApplicantDetails
          vacancyId={params.vacancyID}
          jobRole={params.jobRole}
        />
      </Suspense>
    );
  } catch (error) {
    console.error("Error loading ApplicantDetails:", error);
    notFound();
  }
}



