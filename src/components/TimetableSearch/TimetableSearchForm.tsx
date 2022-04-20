import { Button, Theme, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { StationAutocomplete } from "./StationAutocomplete";
import { useTheme } from "@emotion/react";
import { useTimetableContext } from "../TimetableSearchProvider";

export type DateType = "now" | "arrive" | "depart";

export const TimetableSearchForm = () => {
  const {
    originStation,
    destinationStation,
    dateType,
    dateTime,
    setOriginStation,
    setDestinationStation,
    setDateTime,
    setDateType,
    submitSearch,
    loading,
  } = useTimetableContext();

  // Disable button if we don't have valid data
  const isButtonDisabled =
    !originStation.length ||
    !destinationStation.length ||
    (dateType !== "now" && !dateTime);

  const theme = useTheme() as Theme;
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={submitSearch}
      >
        <StationAutocomplete
          id="origin-station"
          label="Origin Station"
          station={originStation}
          setStation={setOriginStation}
        />
        <StationAutocomplete
          id="destination-station"
          label="Destination Station"
          station={destinationStation}
          setStation={setDestinationStation}
        />

        <FormControl sx={{ marginTop: 6, marginBottom: 3 }}>
          <FormLabel id="travel-times-label">Travel Time</FormLabel>
          <RadioGroup
            aria-labelledby="travel-times-label"
            value={dateType}
            onChange={(evt) => {
              setDateType(evt.target.value as DateType);
            }}
            name="travel-times-radio-group"
            sx={{
              flexDirection: "row",
            }}
          >
            <FormControlLabel value="now" control={<Radio />} label="Now" />
            <FormControlLabel
              value="depart"
              control={<Radio />}
              label="Depart at"
            />
            <FormControlLabel
              value="arrive"
              control={<Radio />}
              label="Arrive by"
            />
          </RadioGroup>
        </FormControl>

        <DateTimePicker
          disabled={dateType === "now"}
          label="Time"
          value={dateTime}
          inputFormat="dd/MM/yyyy HH:mm"
          minDateTime={new Date()}
          onChange={(newDate) => setDateTime(newDate)}
          renderInput={(params) => <TextField {...params} />}
        />
        {dateType !== "now" && (
          <Typography variant="caption">* Date is required</Typography>
        )}

        <Button
          disabled={loading || isButtonDisabled}
          sx={{ marginTop: 6, borderRadius: theme.shape.borderRadius }}
          type="submit"
          aria-label="Search"
          fullWidth
        >
          Search
        </Button>
      </form>
    </LocalizationProvider>
  );
};
