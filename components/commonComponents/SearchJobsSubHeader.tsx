"use client";
import React from "react";
import { Box, Typography, FormControl, Select, MenuItem, Button } from "@mui/material";
// import CustomSelectInput from "@/components/CustomSelectInput";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

// Example sort options – update as needed
const sortByOptions = ["Relevance", "Latest", "Salary"];

const SearchJobsSubHeader = ({ totalJobs,toggleDrawer}: {totalJobs:number,toggleDrawer: ()=>void}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const total = totalJobs || 0;
  const pageNo = Number(searchParams.get("page") || 1);
  const perPage = 10;

  const jobTitle =  searchParams.get("jobTitle") ||searchParams.get("query")  || "Healthcare";
  const location = searchParams.get("location");

  const start = total > 0 ? (pageNo - 1) * perPage + 1 : 0;
  const end = total > 0 ? Math.min(pageNo * perPage, total) : 0;

  const sort = searchParams.get("sort") || "Relevance";

  const handleSortChange = (event: any) => {
    const newSort = event.target.value;
    const params = new URLSearchParams(searchParams.toString());

    params.set("sort", newSort);
    params.set("page", "1"); // reset to page 1 on sort change

    router.push(`${pathname}?${params.toString()}`);
    // Optionally: trigger fetch if data is not auto-bound to query params
  };

  return (
    <Box
        sx={{
        display: "flex",
        flexDirection: {
          xs: "row",
          md: "row",
        },
        flexWrap: {
          xs: "wrap",
          sm: "nowrap",
        },
        justifyContent: {
          xs: "space-between",
          md: "space-between",
        },
        alignItems: "center",
        rowGap: 1,
        p:2
      }}
    >
          <Button
            onClick={toggleDrawer}
            sx={{
              display: { xs: "inline-flex", md: "none" },
            }}
            variant="contained"
          >
            Filter
          </Button>
     <Typography
        variant="body2"
        sx={{
              width: {
            xs: "100%",
            md: "auto",
          },
          order: {
            xs: 2,
            sm: 0,
          },
          textAlign: {
            xs: "center",
            md: "left",
          },
          color: "GrayText",
          fontSize: 14,
          lineHeight: 3,
          fontWeight: 400,
        }}
      >
        {total > 0 ? `${start} - ${end} of ${total}` : "0"}{" "}
        {/* <strong> */}
          {jobTitle} jobs{location ? ` in ${location}` : ""}
        {/* </strong> */}
      </Typography>
      {totalJobs > 0 && (
        <FormControl size="small">
          <Select
            value={sort}
            onChange={handleSortChange}
            // input={<CustomSelectInput />}
            displayEmpty
            sx={{
              "& .MuiSelect-icon": {
                color: "#000",
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  maxHeight: 200,
                },
              },
            }}
          >
            <MenuItem value="" disabled>
              <b>Sort By</b>
            </MenuItem>
            {sortByOptions.map((value) => (
              <MenuItem value={value} key={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Box>
  );
};

export default SearchJobsSubHeader;
