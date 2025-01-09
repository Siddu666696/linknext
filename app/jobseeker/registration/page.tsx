"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EducationForm from '@/components/jobseeker/registration/EducationForm';
import ExperienceForm from '@/components/jobseeker/registration/ExperienceForm';
import PreferenceForm from '@/components/jobseeker/registration/PreferenceForm';
import { Grid } from '@mui/material';

const steps = ['Education Details', 'Experience Details', 'Preferences'];

export default function HorizontalNonLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => steps.length;

  const isLastStep = () => activeStep === totalSteps() - 1;

  const allStepsCompleted = () => Object.keys(completed).length === totalSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    // Example: Add API call or validation logic here
    if (isLastStep()) {
    } else {
      handleNext(); // Move to the next step after submission
    }
  };

  const renderForm = () => {
    switch (activeStep) {
      case 0:
        return <EducationForm />;
      case 1:
        return <ExperienceForm />;
      case 2:
        return <PreferenceForm />;
      default:
        return null;
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Box>
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepButton color="inherit" onClick={handleStep(index)}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          <div>
            {allStepsCompleted() ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={() => setActiveStep(0)}>Reset</Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Box sx={{ mt: 2, mb: 1 }}>{renderForm()}</Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button variant="contained" onClick={handleSubmit}>
                    {isLastStep() ? 'Submit' : 'Continue'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </div>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        {/* Add any additional content for the right section here */}
      </Grid>
    </Grid>
  );
}
