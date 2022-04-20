// TODO - would be good to move these to a global d.ts. file
export interface Station {
  location: {
    id: string;
    name: string;
  };
  platform: string;
  station: {
    id: string;
    name: string;
  };
  arrivalTimestamp: number;
  departureTimestamp: number;
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
