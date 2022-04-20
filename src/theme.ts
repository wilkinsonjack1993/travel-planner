import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    // Name of the component
    MuiButton: {
      defaultProps: {
        // The props to change the default for.
        variant: "contained", // Have default button be contained
      },
    },
  },
});
