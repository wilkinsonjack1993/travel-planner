import { Button, Divider, Theme, Typography } from "@mui/material";
import { useTimetableContext } from "../TimetableSearchProvider";
import { TimetableResult } from "./TimetableResult";
import { SpaceBetweenBox } from "../DesignSystem/SpaceBetweenBox";
import { useTheme } from "@emotion/react";

export const TimetableResults = () => {
  const { clearAll, connections } = useTimetableContext();
  const theme = useTheme() as Theme;

  // This should never happen - but put a fail safe here anyway
  if (!connections || connections.length === 0) {
    return (
      <>
        <Typography marginTop={4}>No available connections found</Typography>
        <Button onClick={clearAll} sx={{ marginTop: 4 }}>
          Back
        </Button>
      </>
    );
  }

  const from = connections[0].from.location.name;
  const to = connections[0].to.location.name;

  return (
    <>
      <Divider sx={{ marginTop: 4, marginBottom: 4 }} />
      <SpaceBetweenBox>
        <Typography>
          Travelling from <strong>{from}</strong> to <strong>{to}</strong>
        </Typography>
      </SpaceBetweenBox>
      {connections.map((connection, index) => {
        return <TimetableResult key={index} connection={connection} />;
      })}
      <Button
        onClick={clearAll}
        sx={{
          marginTop: 6,
          backgroundColor: "gray",
          borderRadius: theme.shape.borderRadius,
        }}
      >
        Reset
      </Button>
    </>
  );
};
