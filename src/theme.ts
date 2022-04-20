import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    // Set primary colors to match grapes
    primary: {
      main: "#936bff",
      light: "#a888ff",
      dark: "#664ab2",
    },
  },
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
