import { Toast as FlowbiteToast } from "flowbite-react";
import { HiCheck, HiFire } from "react-icons/hi";

export enum ToastType {
  Info = "info",
  Danger = "danger",
}

interface ToastProps {
  type: ToastType;
  message: string;
  onDismiss: () => void;
}

export const Toast = ({ type, message, onDismiss }: ToastProps) => {
  const Icon = () => {
    if (type === ToastType.Info) return <HiCheck className="size-5" />;
    if (type === ToastType.Danger) return <HiFire className="size-5" />;
  };

  const classes = () => {
    if (type === ToastType.Info)
      return "text-green-500 dark:bg-green-800 dark:text-green-200";
    if (type === ToastType.Danger)
      return "text-red-500 dark:bg-red-800 dark:text-red-200";
  };

  return (
    <FlowbiteToast className="absolute right-[20px] top-[20px] z-[51]">
      <div
        className={`inline-flex size-8 shrink-0 items-center justify-center rounded-lg ${classes()}`}
      >
        <Icon />
      </div>
      <div className={`ml-3 text-sm font-normal ${classes()}`}>{message}</div>
      <FlowbiteToast.Toggle onDismiss={onDismiss} />
    </FlowbiteToast>
  );
};
