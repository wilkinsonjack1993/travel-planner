import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import { Connection } from "../Types";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Section from "./TimetableSection";
import { DateTime } from "../DesignSystem/DateTime";
import { SpaceBetweenBox } from "../DesignSystem/SpaceBetweenBox";
import { formatDuration, intervalToDuration } from "date-fns";

export const TimetableResult = (props: { connection: Connection }) => {
  const { connection } = props;

  // Calculate the duration of the journeys
  const arrivalTime = connection.to.arrivalTimestamp;
  const departureTime = connection.from.departureTimestamp;
  const duration = intervalToDuration({
    start: new Date(departureTime * 1000),
    end: new Date(arrivalTime * 1000),
  });

  return (
    // TODO - add aria and accessibility tooling into the search results.
    <Accordion sx={{ marginTop: 3 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <SpaceBetweenBox>
          <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
            <DateTime dateTime={connection.from.departureTimestamp} />
            <Typography sx={{ marginLeft: 1, marginRight: 1 }}> - </Typography>
            <DateTime dateTime={connection.to.arrivalTimestamp} />
          </Box>
          <Box sx={{ textAlign: "center", marginRight: 2 }}>
            <Typography>
              {formatDuration(duration, {
                format: ["hours", "minutes"],
              })}
            </Typography>
          </Box>
          {connection.sections.length === 1 ? (
            <Typography>Direct</Typography>
          ) : (
            <Typography
              sx={{
                textDecoration: "underline",
                color: "blue",
                textAlign: "center",
              }}
            >
              {connection.sections.length - 1} changes
            </Typography>
          )}
        </SpaceBetweenBox>
      </AccordionSummary>
      <AccordionDetails>
        <Divider sx={{ marginBottom: 2 }} />

        {connection.sections.map((section, index) => {
          return <Section section={section} key={index} />;
        })}
      </AccordionDetails>
    </Accordion>
  );
};
