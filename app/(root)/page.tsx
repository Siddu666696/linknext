// app/jobs/[...slug]/page.tsx
import CategoryCards from "@/components/commonComponents/CategoriesCards";
import Header from "@/components/commonComponents/Header";
import { semanticSearchJobs } from "@/lib/api/open/queries/trial";
import { parseSearchParams } from "@/lib/utils/commonFunctions";
import {
  Box
} from "@mui/material";
import JobSearchHeroSection from "@/components/commonComponents/JobSearchHeroSection";
import JobSearchClient from "@/components/commonComponents/JobSearchClient";
export default async function JobSearchPage({
  params,
  searchParams,
}: {
  params: { slug?: string[] };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { slug } = await params;
  const appliedSearchParams = (await searchParams) || new URLSearchParams();
  const sp = new URLSearchParams();
  console.log("Search Params:", sp.toString(), appliedSearchParams, slug);

  for (const key in searchParams) {
    const value = searchParams[key];
    if (Array.isArray(value)) {
      value.forEach((v) => sp.append(key, v));
    } else if (value !== undefined) {
      sp.set(key, value);
    }
  }
  const initialFilters = parseSearchParams(sp);
  console.log("Initial Filters:", initialFilters);

  const filters = initialFilters;
  const query = sp?.get("query") || "";
  const page = parseInt(sp.get("page") as string) || 1;
  const limit = parseInt(sp.get("limit") as string) || 10;
  const sortBy = sp.get("sort")?.toLowerCase() || "relevance";
  const offset = (page - 1) * limit;

  const data = await semanticSearchJobs({
    limit: limit,
    offset: offset,
    query,
    sortBy: sortBy,
    filters,
  });

  const jobs = data?.sematicSearchJobs?.jobs || [];
  const aggregators = data?.sematicSearchJobs?.aggregations || {};

  return (
    <Box className="p-6">
      <JobSearchHeroSection />
      <CategoryCards aggregations={aggregators} />
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
