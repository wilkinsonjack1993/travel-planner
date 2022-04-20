import {
  createContext,
  FormEvent,
  ReactNode,
  useContext,
  useState,
} from "react";
import { DateType } from "./TimetableSearchForm";

interface Station {
  location: {
    id: string;
    name: string;
  };
  platform: string;
  station: {
    id: string;
    name: string;
  };
  arrivalTimestamp: number | null;
  departureTimestamp: number | null;
}

export interface Section {
  arrival: Station;
  departure: Station;
  location: {
    name: String;
  };
}

export interface Connection {
  from: Station;
  to: Station;
  sections: Section[];
}

interface TimetableSearchContextType {
  originStation: string;
  destinationStation: string;
  dateTime: Date | null;
  dateType: DateType;

  setOriginStation: (newVal: string) => void;
  setDestinationStation: (newVal: string) => void;
  setDateTime: (newVal: Date | null) => void;
  setDateType: (newVal: DateType) => void;

  connections: Connection[];

  clearAll: () => void;
  submitSearch: (evt: FormEvent) => void;
  loading: boolean;
  activeStep: number;
}

const TimetableSearchContext = createContext<TimetableSearchContextType>(
  {} as TimetableSearchContextType
);

export const useTimetableContext = () => useContext(TimetableSearchContext);

const useTimetableSearch = () => {
  const [originStation, setOriginStation] = useState("");
  const [destinationStation, setDestinationStation] = useState("");
  const [dateTime, setDateTime] = useState<Date | null>(null);
  const [dateType, setDateType] = useState<DateType>("now");
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [connections, setConnections] = useState<Connection[]>([]);

  const validate = () => {
    return true;
  };

  const submitSearch = async (evt: FormEvent) => {
    evt.preventDefault();
    if (!validate()) return;
    setLoading(true);

    const date = "2022-05-01";
    const time = "17:27";

    fetch(
      `http://transport.opendata.ch/v1/connections?from=${originStation}&to=${destinationStation}&date=${date}&time=${time}&isArrivalTime=${
        dateType === "arrive" ? 1 : 0
      }`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res.connections);
        setConnections(res.connections);
        setActiveStep(1);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  const clearAll = () => {
    setOriginStation("");
    setDestinationStation("");
    setDateTime(null);
    setDateType("now");
    setActiveStep(0);
  };

  return {
    originStation,
    destinationStation,
    dateTime,
    dateType,

    connections,

    setOriginStation,
    setDestinationStation,
    setDateTime,
    setDateType,

    clearAll,
    submitSearch,
    loading,
    activeStep,
  };
};

export const TimetableSearchProvider = (props: { children: ReactNode }) => {
  const value = useTimetableSearch();
  return (
    <TimetableSearchContext.Provider value={value}>
      {props.children}
    </TimetableSearchContext.Provider>
  );
};
