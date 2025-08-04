// app/jobs/[...slug]/page.tsx
import JobFilter from "@/components/commonComponents/Filters/JobFilters";
import { LocationFilter } from "@/components/commonComponents/Filters/LocationFilter";
import JobCard from "@/components/commonComponents/JobCard";
import { semanticSearchJobs } from "@/lib/api/open/queries/trial";
import { parseSearchParams } from "@/lib/utils/commonFunctions";
import { parseSlugToFilters } from "@/lib/utils/slugParser";
import { Box, Grid } from "@mui/material";

interface SearchFilters {
  query: string;
  filters: {
    location: string;
    education: string;
    experienceRange: { min: number; max: number };
    skills: string;
    specialization: string;
    salaryRange: { min: number; max: number };
    jobType: string;
    hospital: string;
  };
}

interface JobSearchPageProps {
  params: { slug?: string[] };
  searchParams?: { [key: string]: string | string[] | undefined };
}


export default async function JobSearchPage({ params }: JobSearchPageProps) {
  const { query, filters }: SearchFilters = parseSearchParams(params.searchParams || {});
  

  const data = await semanticSearchJobs({
    limit: 10,
    offset: 0,
    query,
    sortBy: "relevance",
    filters,
  });

  const jobs = data?.sematicSearchJobs?.jobs;
const aggregators = data?.sematicSearchJobs?.aggregations || {};
  if (!jobs || jobs.length === 0) {
    return (
      <Box className="flex items-center justify-center min-h-[400px]">
        <p>No jobs found matching your criteria.</p>
      </Box>
    );
  }

  return (
    <Box className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
      <Box className="md:col-span-1 space-y-4">
        {/* <LocationFilter defaultValue={filters.location} /> */}
      </Box>
      <Box >
        {/* <h2 className="text-xl font-semibold mb-4">Job Results</h2> */}
        {/* Add JobList component here */}
        <Grid container >
          <Grid item md={3}>
                                  <JobFilter allSearchQueryParameters={filters} allFilterOptions={filters} openedItemId={""} aggregators={data?.sematicSearchJobs?.aggregations} handleFilterSearchedOptions={async(filter)=>{"use server"; console.log(filter,"filter change")}}
                                  
                                  // handleClick={handleClick} handleClearFilter={handleClearFilter} handleFilterSearchedOptions={handleFilterSearchedOptions} searchForm={searchForm} handleCheckboxLocation={handleCheckboxLocation} form={form} handleChange={handleChange} handleBlur={handleBlur} handleRefineSearch={handleRefineSearch} handleCheckboxJobType={handleCheckboxJobType} handleCheckboxEducation={handleCheckboxEducation} handleCheckboxHospital={handleCheckboxHospital} handleCheckboxSpecialization={handleCheckboxSpecialization} handleCheckboxSkill={handleCheckboxSkill} viewAllOptions={viewAllOptions} setViewAllOptions={setViewAllOptions}  aggregators={aggregators}
                                  />

          </Grid>
          <Grid item xs={12} md={8} lg={6} spacing={2} gap={2} height={"100vh"}>
            {" "}
              {jobs.map((job) => (
                <Box key={job.vacancyID} p={2} >
                  {/* Job details */}
                  <JobCard jobData={job} />
                  {/* {job.jobRole && <h3 className="text-lg font-bold">{job.jobRole}</h3>} */}
                  {/* {job.company && <p className="text-sm text-gray-600">{job.company}</p>} */}
                </Box>
              ))}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
