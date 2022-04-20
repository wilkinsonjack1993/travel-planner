import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import { Connection } from "./TimetableSearchProvider";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Section from "./TimetableSection";
import { DateTime } from "./DateTime";

export const TimetableResult = (props: { connection: Connection }) => {
  const { connection } = props;
  return (
    <Accordion sx={{ marginTop: 3, fontWeight: "bold" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        // TODO - sort aria out
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Box sx={{ textAlign: "left" }}>
            <Typography fontWeight="600">
              {connection.from.location.name}
            </Typography>
            <DateTime dateTime={connection.from.departureTimestamp} />
          </Box>
          {connection.sections.length === 1 ? (
            <Typography>Direct</Typography>
          ) : (
            <Typography sx={{ textDecoration: "underline", color: "blue" }}>
              {connection.sections.length} stops
            </Typography>
          )}
          <Box sx={{ textAlign: "right", marginRight: 2 }}>
            <Typography fontWeight="600">
              {connection.to.location.name}
            </Typography>
            <DateTime dateTime={connection.to.arrivalTimestamp} />
          </Box>
        </Box>
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
