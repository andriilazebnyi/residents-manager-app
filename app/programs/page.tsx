import { Button } from "flowbite-react";
import Link from "next/link";
import { ProgramsTable } from "../../components/ProgramsTable/ProgramsTable";
import { AddProgramModal } from "../../components/AddProgramModal/AddProgramModal";
import { Suspense } from "react";
import { AddProgramToResidentModal } from "../../components/AddProgramToResidentModal/AddProgramToResidentModal";

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

export default async function Programs() {
  const programs = await getPrograms();
  const residents = await getResidents();

  return (
    <main className="flex min-h-screen flex-col p-5 dark:bg-gray-800">
      <div className="mb-3 flex justify-between">
        <h1 className="mb-5 text-2xl dark:text-white">Manage programs</h1>
        <Link href="?createProgram=true">
          <Button>Add program</Button>
        </Link>
      </div>
      <Suspense fallback={<>Loading...</>}>
        <AddProgramModal />
        <AddProgramToResidentModal residents={residents} />
      </Suspense>
      <ProgramsTable programs={programs} />
    </main>
  );
}
