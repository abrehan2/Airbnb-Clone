"use client";

// IMPORTS -
import { useEffect } from "react";
import EmptyState from "./components/EmptyState";

// PARTIALS -
interface ErrorStateProps {
  error: Error;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <EmptyState title="Uh Oh" subtitle="Something went wrong!" />;
};

export default ErrorState;
