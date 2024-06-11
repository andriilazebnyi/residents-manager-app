import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Tooltip,
} from "flowbite-react";
import Link from "next/link";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import { Program } from "../../models";

interface ProgramsTableProps {
  programs: Program[];
}

export const ProgramsTable = ({ programs }: ProgramsTableProps) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHead>
          <TableHeadCell>Name</TableHeadCell>
          <TableHeadCell>Location</TableHeadCell>
          <TableHeadCell>All day</TableHeadCell>
          <TableHeadCell>Level of care</TableHeadCell>
          <TableHeadCell>Start</TableHeadCell>
          <TableHeadCell>End</TableHeadCell>
          <TableHeadCell>Recurrence</TableHeadCell>
          <TableHeadCell>Actions</TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {programs?.map((program) => (
            <TableRow
              key={program.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {program.name}
              </TableCell>
              <TableCell>{program.location}</TableCell>
              <TableCell>{program.allDay ? "Yes" : "No"}</TableCell>
              <TableCell>{program.levelOfCare.join(", ")}</TableCell>
              <TableCell>{program.start}</TableCell>
              <TableCell>{program.end}</TableCell>
              <TableCell>{program.recurrence?.type}</TableCell>
              <TableCell>
                <Link href={`?addToResident=true&programId=${program.id}`}>
                  <Tooltip content="Add to resident">
                    <Button color="gray">
                      <HiOutlineClipboardCopy className="size-4" />
                    </Button>
                  </Tooltip>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
