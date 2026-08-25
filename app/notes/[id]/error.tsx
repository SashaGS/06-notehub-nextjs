"use client";

// import Error from "next/error";
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
      <p>Could not fetch note details. {error.message}</p>
    </div>
  );
}
