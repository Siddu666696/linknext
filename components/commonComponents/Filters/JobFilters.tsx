"use client";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  Collapse,
  Divider,
  IconButton,
  Input,
  InputAdornment,
  Popover,
  Slider,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import { LocationFilter } from "./LocationFilter";
import GenericFilterPopover from "./FilterPopOver";
// import {
//   EducationFilter,
//   HospitalFilter,
//   LocationFilter,
//   SkillFilter,
//   SpecializationFilter,
// } from "./ViewAllOptions";

// const useStyles = makeStyles((theme) => ({
//   container: {
//     diplay: "flex",
//     flexDirection: "column",
//     gap: 3,
//     backgroundColor: "white",
//     borderRadius: "12px",
//     position: "sticky",
//     top: 100,
//     zIndex: 1,
//     height: "84vh",
//     overflowY: "scroll",
//     scrollbarWidth: "none",
//     "&::-webkit-scrollbar": {
//       width: "0em",
//     },
//     "&::-webkit-scrollbar-track": {
//       background: "",
//     },
//     "&::-webkit-scrollbar-thumb": {
//       background: "",
//       borderRadius: "0px",
//     },
//   },
// }));

const viewAllStyle = {
  fontSize: 16,
  fontWeight: 700,
  lineHeight: "18px",
  color: "#395987",
  textDecoration: "underline",
  textAlign: "center",
  mx: "auto",
  cursor: "pointer",
  width: "max-content",
};
const expandMoreLessStyle = {
  height: "24px",
  width: "24px",
  color: "var(--clr-blue-footer)",
};
const filterKeywordStyle = {
  fontSize: "1rem",
  color: "#333333",
  fontWeight: 600,
  lineHeight: "18px",
};
const checkBoxStyle = {
  pt: 0,
  color: "#C7D3E3",
  "&.Mui-checked": { color: "var(--clr-blue-footer)" },
};

const JobFilter = (props) => {
  const {
    filters,
    // openedItemId,
    // handleClick,
    handleClearFilters,
    handleApplyFilters,
    searchForm,
    handleCheckboxLocation,
    form,
    handleChange,
    handleBlur,
    handleCheckboxJobType,
    handleCheckboxEducation,
    handleCheckboxHospital,
    handleCheckboxSpecialization,
    handleCheckboxSkill,
    viewAllOptions,
    setViewAllOptions,
    aggregators,
  } = props;

  // const handleClose = () => setViewAllOptions(null);
  const open = Boolean(viewAllOptions);
  const id = open ? "simple-popover" : undefined;
  const [openedItemId, setOpenedItemId] = useState("");
  const [salaryRange, setSalaryRange] = useState([
    filters?.salaryRange?.min ?? aggregators?.SalaryRange?.min ?? 0,
    filters?.salaryRange?.max ?? aggregators?.SalaryRange?.max ?? 1000000,
  ]);
  const [experienceRange, setExperienceRange] = useState([
    filters?.experienceRange?.min ?? aggregators?.ExperienceRange?.min ?? 0,
    filters?.experienceRange?.max ?? aggregators?.ExperienceRange?.max ?? 50,
  ]);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (orgEvent) => {
    const clickedItemId = orgEvent.currentTarget.id;
    if (openedItemId === clickedItemId) {
      setOpenedItemId("");
    } else {
      setOpenedItemId(clickedItemId);
    }
  };
const handleCheckboxChange = (filterKey: string, value: string, isChecked: boolean) => {
  const prevValues = filters?.[filterKey] || [];
  const updatedValues = isChecked
    ? prevValues.filter((item: string) => item !== value)
    : [...prevValues, value];

  handleApplyFilters({
    [filterKey]: updatedValues,
  });
};



  return (
    <Box>
      {/* All Filters */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 600, alignItems: "center", display: "flex" }}
          >
            <FilterAltIcon sx={{}} /> All Filters
          </Typography>
        </Box>
        {Object.keys(filters)?.length > 0 && (
          <Typography
            onClick={handleClearFilters}
            sx={{
              fontSize: 14,
              lineHeight: 2.75,
              fontWeight: 600,
              color: "#EB5757",
              cursor: "pointer",
            }}
          >
            Clear All
          </Typography>
        )}
      </Box>
      {/* location   */}
      <Box>
        <Accordion
          sx={{
            p: 1,
            borderRadius: 1,
          }}
        >
          <AccordionSummary expandIcon={<ExpandMore />} id="location">
            <Typography sx={{ ...filterKeywordStyle }}>Location</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ p: 1 }}>
              {(aggregators?.Location || []).slice(0, 5).map((lc, index) => {
                const locationKey = lc?.key?.toLowerCase();
                const isChecked = filters?.location?.includes(locationKey);

                return (
                  <Box
                    key={index}
                    sx={{ display: "flex", alignItems: "flex-start" }}
                  >
                    <Checkbox
                      sx={{ ...checkBoxStyle }}
                      checked={isChecked || false}
                      onChange={() => {
                        const prevLocations = filters?.location || [];
                        const updatedLocations = isChecked
                          ? prevLocations.filter(
                              (l: string) => l !== locationKey
                            )
                          : [...prevLocations, locationKey];

                        handleApplyFilters({
                          location: updatedLocations,
                        });
                      }}
                      name={lc?.key}
                    />
                    <Typography
                      sx={{
                        color: isChecked ? "#000000" : "#6F7482",
                      }}
                    >
                      &nbsp;{lc?.key}
                    </Typography>
                  </Box>
                );
              })}

              {(aggregators?.Location?.length || 0) > 5 && (
                <Typography
                  onClick={(e) => handleOpen(e)}
                  sx={{ ...viewAllStyle }}
                  id="Location"
                >
                  View More
                </Typography>
              )}

              {/* {viewAllOptions && (
                <Popover
                  id={id}
                  open={Boolean(viewAllOptions)}
                  anchorEl={viewAllOptions}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                >
                  <LocationFilter
                    filters={filters}
                    handleClose={handleClose}
                    handleCheckboxLocation={(lc) => {
                      const locationKey = lc?.key?.toLowerCase();
                      const prevLocations = filters?.location || [];
                      const isChecked = prevLocations.includes(locationKey);

                      const updatedLocations = isChecked
                        ? prevLocations.filter((l: string) => l !== locationKey)
                        : [...prevLocations, locationKey];

                      handleApplyFilters({
                        location: updatedLocations,
                      });
                    }}
                    aggregators={aggregators}
                  />
                </Popover>
              )} */}
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
      {anchorEl?.id && (
        <GenericFilterPopover
          anchorEl={anchorEl}
          onClose={handleClose}
          title={anchorEl?.id || ""}
          options={anchorEl?.id ? aggregators[anchorEl?.id] : []}
          selectedOptions={anchorEl?.id ? filters[anchorEl?.id] : []}
          onApply={handleApplyFilters}
          allowMultiSelect={true}
        />
      )}
      {/* Salary */}
      <Accordion
        sx={{
          p: 1,
          borderRadius: 1,
        }}
      >
        <AccordionSummary id="salary" expandIcon={<ExpandMore />}>
          <Typography sx={{ ...filterKeywordStyle }}>Salary</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ p: 1 }}>
            <Input
              fullWidth
              type="number"
              disableUnderline
              placeholder="Minimum"
              sx={{ px: 1, py: 0.5, mb: 1.25, border: "none", borderRadius: 1 }}
              value={salaryRange[0]}
              onChange={(e) => {
                const newMin = Number(e.target.value) || 0;
                setSalaryRange([newMin, salaryRange[1]]);
              }}
            />

            <Input
              fullWidth
              type="number"
              disableUnderline
              placeholder="Maximum"
              sx={{ px: 1, py: 0.5, border: "none", borderRadius: 1 }}
              value={salaryRange[1]}
              onChange={(e) => {
                const newMax = Number(e.target.value) || 0;
                setSalaryRange([salaryRange[0], newMax]);
              }}
            />

            <Slider
              value={salaryRange}
              min={aggregators?.SalaryRange?.min || 0}
              max={aggregators?.SalaryRange?.max || 1000000}
              onChange={(_, newValue: number[]) => {
                setSalaryRange(newValue);
              }}
              onChangeCommitted={(_, newValue: number[]) => {
                handleApplyFilters({
                  salaryRange: { min: newValue[0], max: newValue[1] },
                });
              }}
              step={10000}
              valueLabelDisplay="auto"
            />
          </Box>
        </AccordionDetails>
      </Accordion>
      {/* experience  */}
      <Accordion
        sx={{
          p: 1,
          borderRadius: 1,
        }}
      >
        <AccordionSummary id="experience" expandIcon={<ExpandMore />}>
          <Typography sx={{ ...filterKeywordStyle }}>Experience</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Box sx={{ p: 1 }}>
            <Input
              fullWidth
              type="number"
              placeholder="Minimum"
              disableUnderline
              value={experienceRange[0]}
              onChange={(e) => {
                const newMin = Number(e.target.value) || 0;
                setExperienceRange([newMin, experienceRange[1]]);
              }}
              sx={{
                px: 1,
                py: 0.5,
                mb: 1.25,
                border: "none",
                borderRadius: 1,
              }}
              style={{ borderBottom: "none" }}
            />

            <Input
              fullWidth
              type="number"
              placeholder="Maximum"
              disableUnderline
              value={experienceRange[1]}
              onChange={(e) => {
                const newMax = Number(e.target.value) || 0;
                setExperienceRange([experienceRange[0], newMax]);
              }}
              sx={{
                px: 1,
                py: 0.5,
                border: "none",
                borderRadius: 1,
              }}
              style={{ borderBottom: "none" }}
            />

            <Slider
              value={experienceRange}
              min={aggregators?.ExperienceRange?.min ?? 0}
              max={aggregators?.ExperienceRange?.max ?? 50}
              step={1}
              onChange={(_, newValue: number[]) => {
                setExperienceRange(newValue);
              }}
              onChangeCommitted={(_, newValue: number[]) => {
                handleApplyFilters({
                  experienceRange: { min: newValue[0], max: newValue[1] },
                });
              }}
              valueLabelDisplay="auto"
            />
          </Box>
        </AccordionDetails>
      </Accordion>
      {/* Skill */}
      <Accordion
        sx={{
          p: 1,
          borderRadius: 1,
        }}
      >
        <AccordionSummary expandIcon={<ExpandMore />} id="skill">
          <Typography sx={{ ...filterKeywordStyle }}>Skill</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            sx={{
              p: 1,
            }}
          >
            {aggregators?.Skills?.slice(0, 5)?.map((sr, index) => {
              const skillKey = sr?.key?.toLowerCase();
              const regex = new RegExp(filters?.skills?.join("|"), "i");
              const isChecked = filters?.skills?.length
                ? regex.test(skillKey)
                : false;


              return (
                <Box
                  key={sr.key}
                  sx={{ display: "flex", alignItems: "flex-start" }}
                >
                  <Checkbox
                    onChange={() => {
                      const prevSkills = filters?.skills || [];

                      const updatedSkills = isChecked
                        ? prevSkills.filter((l: string) => l !== skillKey)
                        : [...prevSkills, skillKey];

                      handleApplyFilters({
                        skills: updatedSkills,
                      });
                    }}
                    checked={isChecked || false}
                    name={sr?.key}
                    sx={{ ...checkBoxStyle }}
                  />
                  <Typography
                    sx={{
                      color:
                        filters?.skillFilter?.includes(sr?.key) === true
                          ? "#000000"
                          : "#6F7482",
                    }}
                  >
                    &nbsp;{sr?.key}
                  </Typography>
                </Box>
              );
            })}
            {aggregators?.Skills?.length > 5 && (
              <Typography
                onClick={(e) => handleOpen(e)}
                sx={{ ...viewAllStyle }}
                id="Skills"
              >
                View More
              </Typography>
            )}
            {/* <Popover
              id={id}
              open={viewAllOptions}
              anchorEl={viewAllOptions}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
            ></Popover> */}
          </Box>
        </AccordionDetails>
        {/* </Box> */}
      </Accordion>
      {/* Specialization */}
      <Accordion
        sx={{
          p: 1,
          borderRadius: 1,
        }}
      >
        <AccordionSummary expandIcon={<ExpandMore />} id="specialization">
          <Typography sx={{ ...filterKeywordStyle }}>Specialization</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            sx={{
              p: 1,
            }}
          >
            {aggregators?.Specialization?.slice(0, 5)?.map((sr, index) => (
              <Box
                key={index}
                sx={{ display: "flex", alignItems: "flex-start" }}
              >
                <Checkbox
                  onChange={() => handleCheckboxChange("specialization", sr?.key, filters?.specializationFilter?.includes(sr?.key))}
                  checked={
                    filters?.specializationFilter?.includes(sr?.key) === true &&
                    true
                  }
                  name={sr?.key}
                  sx={{ ...checkBoxStyle }}
                />
                <Typography
                  sx={{
                    color:
                      filters?.specializationFilter?.includes(sr?.key) === true
                        ? "#000000"
                        : "#6F7482",
                  }}
                >
                  &nbsp;{sr?.key}
                </Typography>
              </Box>
            ))}
            {filters?.specialization?.length > 5 && (
              <Typography
                onClick={(e) => setViewAllOptions(e.currentTarget)}
                sx={{ ...viewAllStyle }}
              >
                View More
              </Typography>
            )}
            <Popover
              id={id}
              open={viewAllOptions}
              anchorEl={viewAllOptions}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
            >
              {/* <SpecializationFilter
                    filters={filters}
                    filters={filters}
                    handleClose={handleClose}
                    handleCheckboxSpecialization={handleCheckboxSpecialization}
                  /> */}
            </Popover>
          </Box>
        </AccordionDetails>
      </Accordion>
      {/* Hospitals */}
      <Accordion
        sx={{
          p: 1,
          borderRadius: 1,
        }}
      >
        <AccordionSummary expandIcon={<ExpandMore />} id="hospital">
          <Typography sx={{ ...filterKeywordStyle }}>Hospitals</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            sx={{
              p: 1,
            }}
          >
            {aggregators?.Hospitals?.slice(0, 5)?.map((hp, index) => (
              <Box
                key={index}
                sx={{ display: "flex", alignItems: "flex-start" }}
              >
                <Checkbox
                  onChange={() => handleCheckboxChange("hospital", hp?.key, filters?.hospitalFilter?.includes(hp?.key))}
                  checked={
                    filters?.hospitalFilter?.includes(hp?.key) === true && true
                  }
                  name={hp?.key}
                  sx={{ ...checkBoxStyle }}
                />
                <Typography
                  sx={{
                    color:
                      filters?.hospitalFilter?.includes(hp?.key) === true
                        ? "#000000"
                        : "#6F7482",
                    whiteSpace: "nowrap",
                  }}
                >
                  &nbsp;{hp?.key}
                </Typography>
              </Box>
            ))}
            {aggregators?.Hospitals?.length > 5 && (
              <Typography
                onClick={(e) => setViewAllOptions(e.currentTarget)}
                sx={{ ...viewAllStyle }}
              >
                View More
              </Typography>
            )}
            <Popover
              id={id}
              open={viewAllOptions}
              anchorEl={viewAllOptions}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
            >
              {/* <HospitalFilter
                    filters={filters}
                    filters={filters}
                    handleClose={handleClose}
                    handleCheckboxHospital={handleCheckboxHospital}
                    aggregators={aggregators}
                  /> */}
            </Popover>
          </Box>
        </AccordionDetails>
      </Accordion>
      {/* Education */}
      <Accordion
        sx={{
          p: 1,
          borderRadius: 1,
        }}
      >
        <AccordionSummary expandIcon={<ExpandMore />} id="education">
          <Typography sx={{ ...filterKeywordStyle }}>Education</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            sx={{
              p: 1,
            }}
          >
            {aggregators?.Education?.slice(0, 5)?.map((sr, index) => (
              <Box
                key={index}
                sx={{ display: "flex", alignItems: "flex-start" }}
              >
                <Checkbox
                  sx={{ ...checkBoxStyle }}
                  onChange={() => handleCheckboxChange("education", sr?.key, filters?.educationFilter?.includes(sr?.key))}
                  checked={
                    filters?.educationFilter?.includes(sr?.key) === true && true
                  }
                  name={sr}
                />
                <Typography
                  sx={{
                    color:
                      filters?.educationFilter?.includes(sr?.key) === true
                        ? "#000000"
                        : "#6F7482",
                  }}
                >
                  &nbsp;{sr?.key}
                </Typography>
              </Box>
            ))}
            {filters?.education?.length > 5 && (
              <Typography
                onClick={(e) => setViewAllOptions(e.currentTarget)}
                sx={{ ...viewAllStyle }}
              >
                View More
              </Typography>
            )}
            <Popover
              id={id}
              open={viewAllOptions}
              anchorEl={viewAllOptions}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
            >
              {/* <EducationFilter
                    filters={filters}
                    filters={filters}
                    handleClose={handleClose}
                    handleCheckboxEducation={handleCheckboxEducation}
                  /> */}
            </Popover>
          </Box>
        </AccordionDetails>
      </Accordion>
      {/* Job Type  */}
      <Accordion
        sx={{
          p: 1,
          borderRadius: 1,
        }}
      >
        <AccordionSummary expandIcon={<ExpandMore />} id="jobType">
          <Typography sx={{ ...filterKeywordStyle }}>Job Type</Typography>
        </AccordionSummary>

        <AccordionDetails sx={{ pb: 2 }}>
          <Box
            sx={{
              p: 1,
            
            }}
          >
            {aggregators?.JobType?.map((jobType, index) => (
              <Box
                key={index}
                sx={{ display: "flex", alignItems: "flex-start" }}
              >
                <Checkbox
                  onChange={() => handleCheckboxChange("jobType", jobType?.key, filters?.jobTypeFilter?.includes(jobType?.key))}
                  checked={
                    filters?.jobType?.includes(jobType?.key) === true &&
                    true
                  }
                  name={jobType?.key}
                  sx={{ ...checkBoxStyle }}
                />
                <Typography
                  sx={{
                    color:
                      filters?.jobType?.includes(jobType?.key) === true
                        ? "#000000"
                        : "#6F7482",
                  }}
                >
                  &nbsp;{jobType?.key}
                </Typography>
              </Box>
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default JobFilter;
