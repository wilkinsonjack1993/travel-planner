import { Box, Divider, Typography } from "@mui/material";
import { Section } from "./TimetableSearchProvider";
import { DateTime } from "./DateTime";

const TimetableResultSection = (props: { section: Section }) => {
  const { section } = props;
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ textAlign: "left" }}>
          <Typography>{section.departure.location.name}</Typography>
          <DateTime dateTime={section.departure.departureTimestamp} />
          <Typography>Platform: {section.departure.platform}</Typography>
        </Box>
        <Box sx={{ textAlign: "right" }}>
          <Typography>{section.arrival.location.name}</Typography>
          <DateTime dateTime={section.arrival.arrivalTimestamp} />
          <Typography>Platform: {section.arrival.platform}</Typography>
        </Box>
      </Box>
      <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
    </>
  );
};

export default TimetableResultSection;
