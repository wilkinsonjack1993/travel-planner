import { Typography } from "@mui/material";
import { format } from "date-fns";

export const DateTime = (props: { dateTime: number | null }) => {
  const { dateTime } = props;

  if (!dateTime) return null;
  return <Typography>{format(new Date(dateTime * 1000), "HH:mm")}</Typography>;
};
