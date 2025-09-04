// app/jobs/[...slug]/page.tsx
import JobSearchClient from "@/components/commonComponents/JobSearchClient";
import { semanticSearchJobs } from "@/lib/api/open/queries/trial";
import { parseSearchParams } from "@/lib/utils/commonFunctions";
import { Box } from "@mui/material";
import { SearchFilters } from "./[...slug]/page";


export default async function JobSearchPage({
  params,
  searchParams,
}: {
  params: { slug?: string[] };
  searchParams?: { [key: string]: string | string[] | undefined};
}) {
  const { slug } = await params;
   const appliedSearchParams = await searchParams || new URLSearchParams();
    const sp = new URLSearchParams();
  for (const key in searchParams) {
    const value = searchParams[key];
    if (Array.isArray(value)) {
      value.forEach((v) => sp.append(key, v));
    } else if (value !== undefined) {
      sp.set(key, value);
    }
  }
  const {  filters }: SearchFilters = parseSearchParams(sp);
  const query = sp?.get("query") || "";
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

  const jobs = data?.sematicSearchJobs?.jobs || [];
  const aggregators = data?.sematicSearchJobs?.aggregations || {};

  return (
    <Box p={2}>
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
  );
}
