"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, TextField, Button, Stack } from "@mui/material";

export default function JobSearchBar({query=""}: {query?: string}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Prefill from URL query param
  const [searchTerm, setSearchTerm] = useState(query ||searchParams.get("query") || "");

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      router.push(`/jobs?query=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ maxWidth: 800, mx: "auto" }}
      >
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Search job role (e.g. Nurse, Radiologist)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <Button
          variant="contained"
          size="medium"
          sx={{ px: 2, backgroundColor: "#0070b3" }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Stack>
    </Box>
  );
}
