export enum AttendanceStatus {
  Active = "Active",
  Inactive = "Inactive",
}

export interface Attendance {
  programId: number;
  residentId: number;
  status: AttendanceStatus;
}
