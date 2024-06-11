"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { AddProgramForm } from "../components/AddProgramModal/AddProgramModal";

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.TOKEN}`,
  },
};

export async function createProgram(formData: AddProgramForm) {
  const data = {
    ...formData,
    hobbies: [formData.hobbies],
    levelOfCare: [formData.levelOfCare],
    facilitators: [formData.facilitators],
    tags: [formData.tags],
    recurrence: {
      type: formData.recurrence,
    },
    start: formData.allDay
      ? combineDateAndTime(formData.start, "00:00")
      : combineDateAndTime(formData.start, formData.startTime || "00:00"),
    end: formData.allDay
      ? combineDateAndTime(formData.end, "23:59")
      : combineDateAndTime(formData.end, formData.endTime || "23:59"),
  };

  const { startTime, endTime, ...requestData } = data;

  const response = await fetch(`${process.env.API_URL}programs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
    body: JSON.stringify(requestData),
  });

  if (!response.ok) {
    return {
      status: "failure",
      message: "Failed to create program",
    };
  }

  revalidatePath("/programs");

  redirect("/programs");
}

export async function addProgramToResident(
  programId: number,
  residentId: number,
  status: string,
) {
  const response = await fetch(
    `${process.env.API_URL}programs/${programId}/attend`,
    {
      ...options,
      body: JSON.stringify({
        residentId: Number(residentId),
        status,
      }),
    },
  );

  if (!response.ok) {
    return {
      status: "failure",
      message: "Failed to add program to resident",
    };
  }

  revalidatePath("/programs");

  redirect("/programs");
}

function combineDateAndTime(date: string, time: string): string {
  const dateParsed = new Date(date);

  const [hours, minutes] = time.split(":").map(Number);

  dateParsed.setUTCHours(hours);
  dateParsed.setUTCMinutes(minutes);
  dateParsed.setUTCSeconds(0);
  dateParsed.setUTCMilliseconds(0);

  return dateParsed.toISOString();
}
