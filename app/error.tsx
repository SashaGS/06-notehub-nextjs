"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error }: ErrorProps) {
  useEffect(() => {
    toast.error(`${error}`);
  }, [error]);

  return (
    <div className="error-container">
      <p>Could not fetch the list of notes. {error.message}</p>
    </div>
  );
}
