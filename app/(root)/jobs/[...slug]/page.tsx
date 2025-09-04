// app/jobs/[...slug]/page.tsx
import JobFilter from "@/components/commonComponents/Filters/JobFilters";
import { LocationFilter } from "@/components/commonComponents/Filters/LocationFilter";
import JobCard from "@/components/commonComponents/JobCard";
import JobSearchClient from "@/components/commonComponents/JobSearchClient";
import { semanticSearchJobs } from "@/lib/api/open/queries/trial";
import { parseSearchParams } from "@/lib/utils/commonFunctions";
import { parseSlugToFilters } from "@/lib/utils/slugParser";
import { Box, Grid } from "@mui/material";

export interface SearchFilters {
  slugQuery: string;
  filters: {
    location: string;
    education: string;
    experienceRange: { min: number; max: number };
    skills: string[];
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


export default async function JobSearchPage({ params,searchParams }: JobSearchPageProps) {
    const sp = new URLSearchParams();
  for (const key in searchParams) {
    const value = searchParams[key];
    if (Array.isArray(value)) {
      value.forEach((v) => sp.append(key, v));
    } else if (value !== undefined) {
      sp.set(key, value);
    }
  }
  const {  slugQuery,filters }: SearchFilters = parseSlugToFilters(await params.slug);
  
  const query = slugQuery||sp?.get("query") || "";
console.log("slugQuery",slugQuery,filters,query,"searchParams",searchParams);
   const page = parseInt(sp.get("page") as string) || 1;
  const limit = parseInt(sp.get("limit") as string) || 10;

  const offset = (page - 1) * limit;
  const data = await semanticSearchJobs({
    limit: limit,
    offset: offset,
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
      <Box p={3}>
        {/* <h2 className="text-xl font-semibold mb-4">Job Results</h2> */}
        {/* Add JobList component here */}
          <JobSearchClient
                initialJobs={jobs}
                initialAggregators={aggregators}
                initialFilters={filters}
                initialQuery={query}
                 page={page}
                limit={limit}
                total={data?.sematicSearchJobs?.total || 0}
              />
    
      </Box>
    </Box>
  );
}
