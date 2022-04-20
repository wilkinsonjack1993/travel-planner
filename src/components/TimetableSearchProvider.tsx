import { format } from "date-fns";
import {
  createContext,
  FormEvent,
  ReactNode,
  useContext,
  useState,
} from "react";
import { Connection } from "./Types";
import { DateType } from "./TimetableSearch/TimetableSearchForm";

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

// Context for controlling the step through process and searching of the timetable.
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

  // Search the api for connections between stations.
  const submitSearch = async (evt: FormEvent) => {
    evt.preventDefault();
    setLoading(true);

    // Get search date
    const dateTimeSearch = dateType === "now" ? new Date() : (dateTime as Date);
    const date = format(dateTimeSearch, "yyyy-MM-dd");
    const time = format(dateTimeSearch, "HH:mm");

    fetch(
      `http://transport.opendata.ch/v1/connections?from=${originStation}&to=${destinationStation}&date=${date}&time=${time}&isArrivalTime=${
        dateType === "arrive" ? 1 : 0
      }`
    )
      .then((res) => res.json())
      .then((res) => {
        setConnections(res.connections);
        // Step to results
        setActiveStep(1);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  };

  // Reset everything.
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
