import { Button } from "flowbite-react";
import { ResidentsTable } from "../../components/ResidentsTable/ResidentsTable";
import Link from "next/link";
import { AddResidentModal } from "../../components/AddResidentModal/AddResidentModal";
import { AddResidentToProgramModal } from "../../components/AddResidentToProgramModal/AddResidentToProgramModal";
import { Suspense } from "react";

async function getResidents() {
  const response = await fetch(`${process.env.API_URL}residents`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch residents");
  }

  return response.json();
}

async function getPrograms() {
  const response = await fetch(`${process.env.API_URL}programs`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch programs");
  }

  return response.json();
}

export default async function Residents() {
  const residents = await getResidents();
  const programs = await getPrograms();

  return (
    <main className="flex min-h-screen flex-col p-5 dark:bg-gray-800">
      <div className="mb-3 flex justify-between">
        <h1 className="mb-5 text-2xl dark:text-white">Manage residents</h1>
        <Link href="?createResident=true">
          <Button>Add resident</Button>
        </Link>
      </div>
      <Suspense fallback={<>Loading...</>}>
        <AddResidentModal />
        <AddResidentToProgramModal programs={programs} />
      </Suspense>
      <ResidentsTable residents={residents} />
    </main>
  );
}
