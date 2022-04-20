import { Typography } from "@mui/material";
import { format } from "date-fns";

// Simple component to format epoch date time to hours and minutes
export const DateTime = (props: { dateTime: number | null }) => {
  const { dateTime } = props;

  if (!dateTime) return null;
  return (
    <Typography fontWeight="bold">
      {format(new Date(dateTime * 1000), "HH:mm")}
    </Typography>
  );
};
