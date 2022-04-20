import { useEffect, useState } from "react";

interface Station {
  id: string;
  name: string;
}

const LOCATIONS_URL = "http://transport.opendata.ch/v1/locations";

// Hook to fetch autocomplete suggestions for the Station Name
export const useStationAutocomplete = (
  stationSearchString: string,
  setStationSearchString: (newStationSearchString: string) => void
) => {
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStationSearchString(event?.target.value);
  };

  const [stationResults, setStationResults] = useState<Station[] | null>(null);

  useEffect(() => {
    // Only start auto complete after 3 characters to prevent spamming of API
    if (stationSearchString.length < 3) {
      return;
    }

    // TODO - we could throttle this API call to prevent it being called on every character typed
    fetch(`${LOCATIONS_URL}?query=${stationSearchString}&type=station`)
      .then((res) => res.json())
      .then((res: any) => {
        setStationResults(res.stations);
      })
      .catch((err) => {
        // TODO - handle error
        console.log(err);
      });
  }, [stationSearchString]);

  const autoCompleteOptions = stationResults
    ? stationResults.map((station) => station.name)
    : [];

  return {
    autoCompleteOptions,
    stationSearchString,
    onInputChange,
  };
};
