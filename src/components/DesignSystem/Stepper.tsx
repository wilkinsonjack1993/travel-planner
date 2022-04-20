import Box from "@mui/material/Box";
import MuiStepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";

interface StagesProps {
  steps: string[];
  activeStep: number;
}

// Generic stepper component
const Stepper = (props: StagesProps) => {
  const { activeStep, steps } = props;
  return (
    <Box sx={{ width: "100%" }}>
      <MuiStepper nonLinear activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label} completed={activeStep === steps.length - 1}>
            <StepButton color="inherit">{label}</StepButton>
          </Step>
        ))}
      </MuiStepper>
    </Box>
  );
};

export default Stepper;
