"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition, useEffect, useState } from "react";
import JobFilter from "@/components/commonComponents/Filters/JobFilters";
import JobCard from "@/components/commonComponents/JobCard";
import { Box, Button, Drawer, IconButton, Pagination } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Header from "./Header";
import theme from "@/theme";
import JobAlert from "./JobAlert";
import { useSelector } from "react-redux";
import { Search } from "@mui/icons-material";
import SearchJobsSubHeader from "./SearchJobsSubHeader";

interface Props {
  initialJobs: any[];
  initialAggregators: any;
  initialFilters: any;
  initialQuery: string;
  limit: number;
  page: number;
  total: number;
}
function filtersToQueryString(filters: any): string {
  const params = new URLSearchParams();

  for (const key in filters) {
    const value = filters[key];

    if (value == null) continue;

    if (typeof value === "object" && !Array.isArray(value)) {
      // Handle range objects like { min, max }
      if ("min" in value && "max" in value) {
        params.set(`${key}.min`, String(value.min));
        params.set(`${key}.max`, String(value.max));
      }
    } else if (Array.isArray(value)) {
      // Handle arrays like location: ["delhi", "mumbai"]
      value.forEach((val) => {
        if (val) params.append(key, val);
      });
    } else {
      // Scalar values
      params.set(key, String(value));
    }
  }

  return params.toString();
}
export default function JobSearchClient({
  initialJobs,
  initialAggregators,
  initialFilters,
  initialQuery,
  limit,
  page,
  total,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  const applyFilters = (updatedFilters: any) => {
    const queryString = filtersToQueryString(updatedFilters);

    startTransition(() => {
      router.push(`${pathname}?${queryString}`);
    });
  };
  const clearFilters = () => {
    router.replace(pathname);
  };
  const updateParams = (key: string, value: string | number) => {
  const params = new URLSearchParams(searchParams.toString());



  // Update or add the new key-value
  params.set(key, String(value));

  router.push(`/jobs?${params.toString()}`);
};

  return (
    <Grid container spacing={2}>
      <Header />
      <Grid sx={{ height: "100vh", overflowY: "scroll" }}>
        {/* Desktop Sidebar */}
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            width: 300,
            borderRight: "1px solid #eee",
            position: "sticky",
            overflowY: "scroll",
            overflow: "hidden",
            top: 0,
            p: 2,
          }}
        >
          <JobFilter
            filters={initialFilters}
            aggregators={initialAggregators}
            openedItemId={""}
            handleApplyFilters={(newValues) => {
              applyFilters({ ...initialFilters, ...newValues ,  ...(initialQuery ? { query: initialQuery } : {})});
            }}
            handleClearFilters={clearFilters}
          />
        </Box>

        {/* Mobile Drawer */}
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer}
          sx={{ display: { xs: "block", md: "none" } }}
          PaperProps={{
            sx: { width: "80%", maxWidth: 300 },
          }}
        >
          <JobFilter
            filters={initialFilters}
            aggregators={initialAggregators}
            openedItemId={""}
            handleApplyFilters={(newValues) => {
              applyFilters({ ...initialFilters, ...newValues });
            }}
            handleClearFilters={clearFilters}
          />
        </Drawer>
      </Grid>

      <Grid size="grow" sx={{ height: "100vh", overflowY: "scroll" }}>
     
        {isPending && <p>Loading...</p>}
        {initialJobs?.length === 0 && !isPending ? (
          <Box>No jobs found.</Box>
        ) : (
          <>
          <SearchJobsSubHeader totalJobs={total} toggleDrawer={toggleDrawer} />
            <Box mb={5} pb={2}>
              {initialJobs?.map((job) => (
                <Box key={job.vacancyID} mb={2}>
                  <JobCard jobData={job} />
                </Box>
              ))}
            </Box>
            <Pagination
              sx={{
                bottom: 0,
                position: "fixed",
                alignSelf: "center",
                p: 2,
                width: "100%",
                backgroundColor: theme.palette.background.paper,
              }}
              count={Math.ceil(total / limit)}
              boundaryCount={1}
              siblingCount={1}
              page={page}
              onChange={(e, value) => updateParams("page", value)}
              color="primary"
            />
          </>
        )}
      </Grid>
      <Grid size={3} sx={{ display: { xs: "none", md: "block" }, p: 2 }}>
        <JobAlert />
      </Grid>
    </Grid>
  );
}
