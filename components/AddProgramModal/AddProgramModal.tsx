"use client";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Label,
  Modal,
  Select,
  TextInput,
  Datepicker,
  Checkbox,
} from "flowbite-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { createProgram } from "@/actions/program";
import { Dimension, Recurrence, ResidentLevelOfCare } from "@/models";
import { InputTags } from "../InputTags/InputTags";
import { Toast, ToastType } from "../Toast/Toast";

export interface AddProgramForm {
  name: string;
  location: string;
  allDay: boolean;
  start: string;
  startTime?: string;
  end: string;
  endTime?: string;
  tags: string[];
  dimension: string;
  facilitators: string;
  levelOfCare: ResidentLevelOfCare;
  hobbies: string;
  recurrence: Recurrence;
  isRepeated: boolean;
}

export const AddProgramModal = () => {
  const searchParams = useSearchParams();
  const showModal = searchParams.get("createProgram") === "true";
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [toast, setToast] = useState<{ type: ToastType; message: string }>();

  const schema = Yup.object().shape({
    name: Yup.string().trim().required().min(5).max(64),
    location: Yup.string().trim().required().min(5).max(64),
    allDay: Yup.boolean().required(),
    start: Yup.string().required(),
    startTime: Yup.string().optional(),
    end: Yup.string().required(),
    endTime: Yup.string().optional(),
    tags: Yup.array().min(1).required(),
    dimension: Yup.string().required(),
    facilitators: Yup.string().required(),
    levelOfCare: Yup.string()
      .oneOf([
        ResidentLevelOfCare.Assisted,
        ResidentLevelOfCare.Independent,
        ResidentLevelOfCare.Longterm,
        ResidentLevelOfCare.Memory,
      ])
      .required(),
    hobbies: Yup.string().required(),
    recurrence: Yup.string()
      .oneOf([Recurrence.Weekly, Recurrence.Monthly, Recurrence.Yearly])
      .required(),
    isRepeated: Yup.boolean().required(),
  });

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      location: "",
      allDay: false,
      start: "",
      startTime: "",
      end: "",
      endTime: "",
      tags: [],
      dimension: Dimension.Physical,
      facilitators: "Resident",
      levelOfCare: ResidentLevelOfCare.Independent,
      hobbies: "Dance",
      recurrence: Recurrence.Weekly,
      isRepeated: false,
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = () => {
    startTransition(async () => {
      const result = await createProgram(getValues());
      const toastData = {
        type: result?.status === "failure" ? ToastType.Danger : ToastType.Info,
        message:
          result?.status === "failure"
            ? result?.message
            : "Program added successfully",
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
        <Modal.Header>Add program</Modal.Header>
        <Modal.Body>
          <form className="space-y-4">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <div className="max-w-md">
                  <div className="mb-2 block">
                    <Label
                      htmlFor={field.name}
                      value="Name"
                      color={errors?.name && "failure"}
                    />
                  </div>
                  <TextInput
                    id={field.name}
                    type="text"
                    onChange={(e) => field.onChange(e)}
                    value={field.value}
                    color={errors?.name && "failure"}
                    required
                  />
                  <span className="mt-1 text-sm text-red-600">
                    {errors?.name?.message}
                  </span>
                </div>
              )}
            />
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <div className="max-w-md">
                  <div className="mb-2 block">
                    <Label
                      htmlFor={field.name}
                      value="Location"
                      color={errors?.location && "failure"}
                    />
                  </div>
                  <TextInput
                    id={field.name}
                    type="text"
                    onChange={(e) => field.onChange(e)}
                    value={field.value}
                    color={errors?.location && "failure"}
                    required
                  />
                  <span className="mt-1 text-sm text-red-600">
                    {errors?.location?.message}
                  </span>
                </div>
              )}
            />
            <Controller
              name="allDay"
              control={control}
              render={({ field }) => (
                <div className="max-w-md">
                  <Checkbox
                    id={field.name}
                    onChange={(e) => field.onChange(e)}
                    checked={field.value}
                  />
                  <Label
                    htmlFor={field.name}
                    value="All day"
                    className="ml-2"
                  />
                </div>
              )}
            />
            <div className="flex justify-between">
              <Controller
                name="start"
                control={control}
                render={({ field }) => (
                  <div className="max-w-md">
                    <div className="mb-2 block">
                      <Label
                        htmlFor={field.name}
                        value="Start date"
                        color={errors?.start && "failure"}
                      />
                    </div>
                    <Datepicker
                      id="moveInDate"
                      onSelectedDateChanged={(date) =>
                        field.onChange(date.toISOString())
                      }
                      value={field.value}
                      color={errors?.start && "failure"}
                      placeholder="Select start date"
                      required
                    />
                    <span className="mt-1 text-sm text-red-600">
                      {errors?.start?.message}
                    </span>
                  </div>
                )}
              />
              <Controller
                name="startTime"
                control={control}
                render={({ field }) => (
                  <div className="max-w-md">
                    <div className="mb-2 block">
                      <Label
                        htmlFor={field.name}
                        value="Start time"
                        color={errors?.startTime && "failure"}
                      />
                    </div>
                    <TextInput
                      id={field.name}
                      type="time"
                      onChange={(e) => field.onChange(e)}
                      value={field.value}
                      color={errors?.startTime && "failure"}
                      disabled={watch("allDay")}
                      required
                    />
                    <span className="mt-1 text-sm text-red-600">
                      {errors?.startTime?.message}
                    </span>
                  </div>
                )}
              />
            </div>
            <div className="flex justify-between">
              <Controller
                name="end"
                control={control}
                render={({ field }) => (
                  <div className="max-w-md">
                    <div className="mb-2 block">
                      <Label
                        htmlFor={field.name}
                        value="End date"
                        color={errors?.end && "failure"}
                      />
                    </div>
                    <Datepicker
                      id="moveInDate"
                      onSelectedDateChanged={(date) =>
                        field.onChange(date.toISOString())
                      }
                      value={field.value}
                      color={errors?.end && "failure"}
                      placeholder="Select end date"
                      required
                    />
                    <span className="mt-1 text-sm text-red-600">
                      {errors?.end?.message}
                    </span>
                  </div>
                )}
              />
              <Controller
                name="endTime"
                control={control}
                render={({ field }) => (
                  <div className="max-w-md">
                    <div className="mb-2 block">
                      <Label
                        htmlFor={field.name}
                        value="End time"
                        color={errors?.endTime && "failure"}
                      />
                    </div>
                    <TextInput
                      id={field.name}
                      type="time"
                      onChange={(e) => field.onChange(e)}
                      value={field.value}
                      color={errors?.endTime && "failure"}
                      disabled={watch("allDay")}
                      required
                    />
                    <span className="mt-1 text-sm text-red-600">
                      {errors?.endTime?.message}
                    </span>
                  </div>
                )}
              />
            </div>
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <div className="max-w-md">
                  <div className="mb-2 block">
                    <Label
                      htmlFor={field.name}
                      value="Tags"
                      color={errors?.tags && "failure"}
                    />
                  </div>
                  <InputTags
                    value={field.value}
                    onChange={(e) => field.onChange(e)}
                    color={errors?.tags && "failure"}
                  />
                  <span className="mt-1 text-sm text-red-600">
                    {errors?.tags?.message}
                  </span>
                </div>
              )}
            />
            <Controller
              name="dimension"
              control={control}
              render={({ field }) => (
                <div className="max-w-md">
                  <div className="mb-2 block">
                    <Label htmlFor={field.name} value="Dimension" />
                  </div>
                  <Select
                    id="dimension"
                    onChange={(e) => field.onChange(e.target.value)}
                    value={field.value}
                  >
                    <option value="Physical">Physical</option>
                    <option value="Intellectual">Intellectual</option>
                    <option value="Mental">Mental</option>
                    <option value="Socialization">Socialization</option>
                    <option value="Social">Social</option>
                    <option value="Community">Community</option>
                  </Select>
                </div>
              )}
            />
            <Controller
              name="facilitators"
              control={control}
              render={({ field }) => (
                <div className="max-w-md">
                  <div className="mb-2 block">
                    <Label htmlFor={field.name} value="Facilitators" />
                  </div>
                  <Select
                    id="facilitators"
                    onChange={(e) => field.onChange(e.target.value)}
                    value={field.value}
                  >
                    <option value="Active Living Assistant">
                      Active Living Assistant
                    </option>
                    <option value="Resident">Resident</option>
                  </Select>
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
              name="hobbies"
              control={control}
              render={({ field }) => (
                <div className="max-w-md">
                  <div className="mb-2 block">
                    <Label htmlFor={field.name} value="Hobbies" />
                  </div>
                  <Select
                    id="hobbies"
                    onChange={(e) => field.onChange(e.target.value)}
                    value={field.value}
                  >
                    <option value="Dance">Dance</option>
                    <option value="Arts">Arts</option>
                    <option value="Boating">Boating</option>
                  </Select>
                </div>
              )}
            />
            <Controller
              name="recurrence"
              control={control}
              render={({ field }) => (
                <div className="max-w-md">
                  <div className="mb-2 block">
                    <Label htmlFor={field.name} value="Recurrence" />
                  </div>
                  <Select
                    id="recurrence"
                    onChange={(e) => field.onChange(e.target.value)}
                    value={field.value}
                  >
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                  </Select>
                </div>
              )}
            />
            <Controller
              name="isRepeated"
              control={control}
              render={({ field }) => (
                <div className="max-w-md">
                  <Checkbox
                    id={field.name}
                    onChange={(e) => field.onChange(e)}
                    checked={field.value}
                  />
                  <Label
                    htmlFor={field.name}
                    value="Is repeated?"
                    className="ml-2"
                  />
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
