import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useStationAutocomplete } from "../hooks/useStationAutocomplete";

const autocompleteStyles = { width: "100%", marginTop: 6 };

interface StationAutocompleteProps {
  station: string;
  setStation: (newVal: string) => void;
  id: string;
  label: string;
}

export const StationAutocomplete = (props: StationAutocompleteProps) => {
  const { station, setStation, id, label } = props;

  const { autoCompleteOptions, onInputChange } = useStationAutocomplete(
    station,
    setStation
  );

  return (
    <Autocomplete
      disablePortal
      id={id}
      options={autoCompleteOptions}
      sx={autocompleteStyles}
      renderInput={(params) => (
        <TextField
          {...params}
          value={station}
          onChange={onInputChange}
          label={label}
        />
      )}
    />
  );
};
