import { useTheme } from "@emotion/react";
import { Box, Theme, Typography } from "@mui/material";
import { TimetableSearchForm } from "./TimetableSearch/TimetableSearchForm";
import StagesStepper from "./DesignSystem/Stepper";
import { useTimetableContext } from "./TimetableSearchProvider";
import { TimetableResults } from "./TimetableResults/TimetableResults";

const STEPS = ["Find times", "Search Results"];

// Component that controls the step through process of searching the timetable.
const TimetableSearch = () => {
  const theme = useTheme() as Theme;

  const { activeStep } = useTimetableContext();

  return (
    <Box
      flexDirection="column"
      display="flex"
      sx={{
        width: "100%",
        maxWidth: "700px",
        margin: "auto",
        marginTop: 10,
        padding: 4,
        borderRadius: theme.shape.borderRadius,
        background: theme.palette.background.paper,
        boxShadow: theme.shadows[10],
      }}
    >
      <Typography variant="h3" component="h2" sx={{ marginBottom: 4 }}>
        Transport Planner
      </Typography>
      <StagesStepper steps={STEPS} activeStep={activeStep} />
      {activeStep === 0 ? <TimetableSearchForm /> : <TimetableResults />}
    </Box>
  );
};

export default TimetableSearch;
