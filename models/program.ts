import { Attendance, ResidentLevelOfCare } from ".";

export enum Dimension {
  Physical = "Physical",
  Intellectual = "Intellectual",
  Mental = "Mental",
  Socialization = "Socialization",
  Social = "Social",
  Community = "Community",
}

export enum Recurrence {
  Weekly = "Weekly",
  Monthly = "Monthly",
  Yearly = "Yearly",
}

export interface Program {
  id: number;
  parentId: number | null;
  name: string;
  location: string;
  allDay: boolean;
  start: string;
  end: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  dimension: Dimension;
  facilitators: string[];
  levelOfCare: ResidentLevelOfCare[];
  hobbies: string[];
  recurrence: {
    type?: Recurrence;
  } | null;
  isRepeated: true;
  applicantId: null;
  attendance: Attendance[];
}
