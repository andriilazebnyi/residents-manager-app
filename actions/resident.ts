"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { AddResidentForm } from "../components/AddResidentModal/AddResidentModal";

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.TOKEN}`,
  },
};

export async function createResident(formData: AddResidentForm) {
  const response = await fetch(`${process.env.API_URL}residents`, {
    ...options,
    body: JSON.stringify({
      ...formData,
      name: `${formData.firstName} ${formData.lastName}`,
    }),
  });

  if (!response.ok) {
    return {
      status: "failure",
      message: "Failed to create resident",
    };
  }

  revalidatePath("/residents");

  redirect("/residents");
}

export async function addResidentToProgram(
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
      message: "Failed to add resident to a program",
    };
  }

  revalidatePath("/residents");

  redirect("/residents");
}
