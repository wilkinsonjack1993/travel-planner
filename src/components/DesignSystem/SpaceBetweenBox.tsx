import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { BoxProps } from "@mui/system";

// Styled box component that uses space between in a flexbox row.
export const SpaceBetweenBox = styled((props: BoxProps) => <Box {...props} />)(
  () => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  })
);
