"use client";

import Link from "next/link";
import { Button, Label, Modal, Select } from "flowbite-react";
import { useState, useTransition } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { addProgramToResident } from "@/actions/program";
import { Resident } from "@/models";
import { Toast, ToastType } from "../Toast/Toast";

interface AddProgramToResidentProps {
  residents: Resident[];
}

export const AddProgramToResidentModal = ({
  residents,
}: AddProgramToResidentProps) => {
  const searchParams = useSearchParams();
  const showModal = searchParams.get("addToResident") === "true";
  const programId = Number(searchParams.get("programId"));
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [toast, setToast] = useState<{ type: ToastType; message: string }>();

  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      resident: 0,
      status: "Active",
    },
  });

  const onSubmit = () => {
    startTransition(async () => {
      const { resident, status } = getValues();
      const result = await addProgramToResident(programId, resident, status);
      const toastData = {
        type: result?.status === "failure" ? ToastType.Danger : ToastType.Info,
        message:
          result?.status === "failure"
            ? result?.message
            : "Program added to resident successfully",
      };
      setToast((prevStatus) => ({
        ...prevStatus,
        ...toastData,
      }));
    });
  };

  return (
    <>
      {toast?.type && (
        <Toast
          type={toast.type}
          message={toast.message}
          onDismiss={() => setToast(undefined)}
        />
      )}
      <Modal show={showModal} size="md">
        <Modal.Header>Add resident to program</Modal.Header>
        <Modal.Body>
          <form className="space-y-4">
            <Controller
              name="resident"
              control={control}
              render={({ field }) => (
                <div className="max-w-md">
                  <div className="mb-2 block">
                    <Label htmlFor={field.name} value="Resident" />
                  </div>
                  <Select
                    id="program"
                    onChange={(e) => field.onChange(e.target.value)}
                    value={field.value}
                  >
                    {residents.map(({ id, name }) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                  </Select>
                </div>
              )}
            />
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <div className="max-w-md">
                  <div className="mb-2 block">
                    <Label htmlFor={field.name} value="Status" />
                  </div>
                  <Select
                    id="program"
                    onChange={(e) => field.onChange(e.target.value)}
                    value={field.value}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </Select>
                </div>
              )}
            />
          </form>
        </Modal.Body>
        <Modal.Footer className="justify-end">
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={isPending}
            isProcessing={isPending}
          >
            Add
          </Button>
          <Link href={pathname}>
            <Button color="gray">Cancel</Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
};
