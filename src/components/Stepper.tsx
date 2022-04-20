import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";

interface StagesProps {
  steps: string[];
  activeStep: number;
}

const StagesStepper = (props: StagesProps) => {
  const { activeStep, steps } = props;
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={activeStep === steps.length - 1}>
            <StepButton color="inherit">{label}</StepButton>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default StagesStepper;
