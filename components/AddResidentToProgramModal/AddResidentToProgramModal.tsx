"use client";

import Link from "next/link";
import { Button, Label, Modal, Select } from "flowbite-react";
import { useState, useTransition } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { addResidentToProgram } from "@/actions/resident";
import { Program } from "@/models";
import { Toast, ToastType } from "../Toast/Toast";

interface AddResidentToProgramProps {
  programs: Program[];
}

export const AddResidentToProgramModal = ({
  programs,
}: AddResidentToProgramProps) => {
  const searchParams = useSearchParams();
  const showModal = searchParams.get("addToProgram") === "true";
  const residentId = Number(searchParams.get("residentId"));
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [toast, setToast] = useState<{ type: ToastType; message: string }>();

  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      program: 0,
      status: "Active",
    },
  });

  const onSubmit = () => {
    startTransition(async () => {
      const { program, status } = getValues();
      const result = await addResidentToProgram(program, residentId, status);
      const toastData = {
        type: result?.status === "failure" ? ToastType.Danger : ToastType.Info,
        message:
          result?.status === "failure"
            ? result?.message
            : "Resident added to program successfully",
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
              name="program"
              control={control}
              render={({ field }) => (
                <div className="max-w-md">
                  <div className="mb-2 block">
                    <Label htmlFor={field.name} value="Program" />
                  </div>
                  <Select
                    id="program"
                    onChange={(e) => field.onChange(e.target.value)}
                    value={field.value}
                  >
                    {programs.map(({ id, name }) => (
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
