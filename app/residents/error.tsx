"use client";

import { Button } from "flowbite-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.log("error", error);
  return (
    <div className="flex flex-col items-center p-5">
      <h2>{error.message}</h2>
      <Button className="mt-3" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
