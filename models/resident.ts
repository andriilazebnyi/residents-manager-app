import { Attendance } from "./attendance";

export enum ResidentStatus {
  Here = "HERE",
  Hospital = "HOSPITAL",
  Isolation = "ISOLATION",
  LOA = "LOA",
}

export enum ResidentLevelOfCare {
  Independent = "INDEPENDENT",
  Memory = "MEMORY",
  Assisted = "ASSISTED",
  Longterm = "LONGTERM",
}

export enum ResidentAmbulation {
  NoLimitations = "NOLIMITATIONS",
  Cane = "CANE",
  Walker = "WALKER",
  WheelChair = "WHEELCHAIR",
}

export interface Resident {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  preferredName: string | null;
  status: ResidentStatus;
  room: string;
  levelOfCare: ResidentLevelOfCare;
  ambulation: ResidentAmbulation;
  birthDate: string;
  moveInDate: string;
  createdAt: string;
  updatedAt: string;
  applicantId: number | null;
  attendance: Attendance[];
}
