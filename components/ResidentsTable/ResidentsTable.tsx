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
import { HiOutlineClipboardCopy } from "react-icons/hi";
import Link from "next/link";
import { Resident } from "../../models";

interface ResidentsTableProps {
  residents: Resident[];
}

export const ResidentsTable = ({ residents }: ResidentsTableProps) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHead>
          <TableHeadCell>Name</TableHeadCell>
          <TableHeadCell>Status</TableHeadCell>
          <TableHeadCell>Room</TableHeadCell>
          <TableHeadCell>Level of care</TableHeadCell>
          <TableHeadCell>Ambulation</TableHeadCell>
          <TableHeadCell>Programs</TableHeadCell>
          <TableHeadCell>Actions</TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {residents?.map((resident) => (
            <TableRow
              key={resident.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {resident.name}
              </TableCell>
              <TableCell>{resident.status}</TableCell>
              <TableCell>{resident.room}</TableCell>
              <TableCell>{resident.levelOfCare}</TableCell>
              <TableCell>{resident.ambulation}</TableCell>
              <TableCell>
                {resident.attendance
                  .map(({ programId }) => programId)
                  .join(", ")}
              </TableCell>
              <TableCell>
                <Link href={`?addToProgram=true&residentId=${resident.id}`}>
                  <Tooltip content="Add to program">
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
