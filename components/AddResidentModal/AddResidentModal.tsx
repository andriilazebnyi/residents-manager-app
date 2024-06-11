"use client";

import * as Yup from "yup";
import { useState, useTransition } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Label,
  Modal,
  Select,
  TextInput,
  Datepicker,
} from "flowbite-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { createResident } from "../../actions/resident";
import {
  ResidentAmbulation,
  ResidentLevelOfCare,
  ResidentStatus,
} from "../../models";
import { Toast, ToastType } from "../Toast/Toast";

export interface AddResidentForm {
  firstName: string;
  lastName: string;
  preferredName?: string | null;
  status: ResidentStatus;
  room: string;
  levelOfCare: ResidentLevelOfCare;
  ambulation: ResidentAmbulation;
  birthDate: string;
  moveInDate: string;
}

export const AddResidentModal = () => {
  const searchParams = useSearchParams();
  const showModal = searchParams.get("createResident") === "true";
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [toast, setToast] = useState<{ type: ToastType; message: string }>();

  const schema = Yup.object().shape({
    firstName: Yup.string().trim().required().min(2).max(64),
    lastName: Yup.string().trim().required().min(2).max(64),
    preferredName: Yup.string().nullable().optional(),
    status: Yup.string()
      .oneOf([
        ResidentStatus.Here,
        ResidentStatus.Hospital,
        ResidentStatus.Isolation,
        ResidentStatus.LOA,
      ])
      .required(),
    room: Yup.string().required().min(1).max(10),
    levelOfCare: Yup.string()
      .oneOf([
        ResidentLevelOfCare.Assisted,
        ResidentLevelOfCare.Independent,
        ResidentLevelOfCare.Longterm,
        ResidentLevelOfCare.Memory,
      ])
      .required(),
    ambulation: Yup.string()
      .oneOf([
        ResidentAmbulation.Cane,
        ResidentAmbulation.NoLimitations,
        ResidentAmbulation.Walker,
        ResidentAmbulation.WheelChair,
      ])
      .required(),
    birthDate: Yup.string().required(),
    moveInDate: Yup.string().required(),
  });

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      preferredName: null,
      status: ResidentStatus.Here,
      room: "",
      levelOfCare: ResidentLevelOfCare.Independent,
      ambulation: ResidentAmbulation.NoLimitations,
      birthDate: "",
      moveInDate: "",
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = () => {
    startTransition(async () => {
      const result = await createResident(getValues());
      const toastData = {
        type: result?.status === "failure" ? ToastType.Danger : ToastType.Info,
        message:
          result?.status === "failure"
            ? result?.message
            : "Resident added successfully",
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
        <Modal.Header>Add resident</Modal.Header>
        <Modal.Body>
          <form className="space-y-4">
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <div className="max-w-md">
                  <div className="mb-2 block">
                    <Label
                      htmlFor={field.name}
                      value="First name"
                      color={errors?.firstName && "failure"}
                    />
                  </div>
                  <TextInput
                    id={field.name}
                    type="text"
                    onChange={(e) => field.onChange(e)}
                    value={field.value}
                    color={errors?.firstName && "failure"}
                    required
                  />
                  <span className="mt-1 text-sm text-red-600">
                    {errors?.firstName?.message}
                  </span>
                </div>
              )}
            />
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <div className="max-w-md">
                  <div className="mb-2 block">
                    <Label
                      htmlFor={field.name}
                      value="Last name"
                      color={errors?.lastName && "failure"}
                    />
                  </div>
                  <TextInput
                    id={field.name}
                    type="text"
                    onChange={(e) => field.onChange(e)}
                    value={field.value}
                    color={errors?.lastName && "failure"}
                    required
                  />
                  <span className="mt-1 text-sm text-red-600">
                    {errors?.lastName?.message}
                  </span>
                </div>
              )}
            />
            <Controller
              name="preferredName"
              control={control}
              render={({ field }) => (
                <div className="max-w-md">
                  <div className="mb-2 block">
                    <Label
                      htmlFor={field.name}
                      value="Preferred name"
                      color={errors?.preferredName && "failure"}
                    />
                  </div>
                  <TextInput
                    id={field.name}
                    type="text"
                    onChange={(e) => field.onChange(e)}
                    value={field.value || ""}
                    color={errors?.preferredName && "failure"}
                  />
                  <span className="mt-1 text-sm text-red-600">
                    {errors?.preferredName?.message}
                  </span>
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
                    id="status"
                    onChange={(e) => field.onChange(e.target.value)}
                    value={field.value}
                  >
                    <option value="HERE">Here</option>
                    <option value="HOSPITAL">Hospital</option>
                    <option value="ISOLATION">Isolation</option>
                    <option value="LOA">LOA</option>
                  </Select>
                </div>
              )}
            />
            <Controller
              name="room"
              control={control}
              render={({ field }) => (
                <div className="max-w-md">
                  <div className="mb-2 block">
                    <Label
                      htmlFor={field.name}
                      value="Room"
                      color={errors?.room && "failure"}
                    />
                  </div>
                  <TextInput
                    id={field.name}
                    type="number"
                    onChange={(e) => field.onChange(e)}
                    value={field.value}
                    color={errors?.room && "failure"}
                    required
                  />
                  <span className="mt-1 text-sm text-red-600">
                    {errors?.room?.message}
                  </span>
                </div>
              )}
            />
            <Controller
              name="levelOfCare"
              control={control}
              render={({ field }) => (
                <div className="max-w-md">
                  <div className="mb-2 block">
                    <Label htmlFor={field.name} value="Level of care" />
                  </div>
                  <Select
                    id="levelOfCare"
                    onChange={(e) => field.onChange(e.target.value)}
                    value={field.value}
                  >
                    <option value="INDEPENDENT">Independent</option>
                    <option value="MEMORY">Memory</option>
                    <option value="ASSISTED">Assisted</option>
                    <option value="LONGTERM">Longterm</option>
                  </Select>
                </div>
              )}
            />
            <Controller
              name="ambulation"
              control={control}
              render={({ field }) => (
                <div className="max-w-md">
                  <div className="mb-2 block">
                    <Label htmlFor={field.name} value="Ambulation" />
                  </div>
                  <Select
                    id="ambulation"
                    onChange={(e) => field.onChange(e.target.value)}
                    value={field.value}
                  >
                    <option value="NOLIMITATIONS">No limitations</option>
                    <option value="CANE">Cane</option>
                    <option value="WALKER">Walker</option>
                    <option value="WHEELCHAIR">WheelChair</option>
                  </Select>
                </div>
              )}
            />
            <Controller
              name="birthDate"
              control={control}
              render={({ field }) => (
                <div className="max-w-md">
                  <div className="mb-2 block">
                    <Label
                      htmlFor={field.name}
                      value="Birth date"
                      color={errors?.birthDate && "failure"}
                    />
                  </div>
                  <Datepicker
                    id="birthDate"
                    onSelectedDateChanged={(date) =>
                      field.onChange(date.toISOString())
                    }
                    value={field.value}
                    color={errors?.birthDate && "failure"}
                    placeholder="Select birth date"
                    required
                  />
                  <span className="mt-1 text-sm text-red-600">
                    {errors?.birthDate?.message}
                  </span>
                </div>
              )}
            />
            <Controller
              name="moveInDate"
              control={control}
              render={({ field }) => (
                <div className="max-w-md">
                  <div className="mb-2 block">
                    <Label
                      htmlFor={field.name}
                      value="Move in date"
                      color={errors?.moveInDate && "failure"}
                    />
                  </div>
                  <Datepicker
                    id="moveInDate"
                    onSelectedDateChanged={(date) =>
                      field.onChange(date.toISOString())
                    }
                    value={field.value}
                    color={errors?.moveInDate && "failure"}
                    placeholder="Select move in date"
                    required
                  />
                  <span className="mt-1 text-sm text-red-600">
                    {errors?.moveInDate?.message}
                  </span>
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
