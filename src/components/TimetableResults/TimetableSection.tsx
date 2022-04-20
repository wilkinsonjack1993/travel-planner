import { Box, Divider, Typography } from "@mui/material";
import { Section, Station } from "../Types";
import { DateTime } from "../DesignSystem/DateTime";
import { BoxProps } from "@mui/system";

interface StationDetailsProps extends BoxProps {
  station: Station;
  time: number;
}

// TODO - could move this to a new file if needed elsewhere.
const StationDetails = (props: StationDetailsProps) => {
  const { station, time, ...otherProps } = props;

  return (
    <Box {...otherProps}>
      <Typography>{station.location.name}</Typography>
      <DateTime dateTime={time} />
      <Typography>
        Platform: {station.platform ? station.platform : "N/A"}
      </Typography>
    </Box>
  );
};

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
        <StationDetails
          time={section.departure.departureTimestamp}
          sx={{ textAlign: "left" }}
          station={section.departure}
        />
        <StationDetails
          sx={{ textAlign: "right" }}
          station={section.arrival}
          time={section.arrival.arrivalTimestamp}
        />
      </Box>
      <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
    </>
  );
};

export default TimetableResultSection;
