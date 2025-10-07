import { Loader2Icon } from "lucide-react";

export function Spinner({ className, ...props }) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={`w-4 h-4 animate-spin ${className || ""}`}
      {...props}
    />
  );
}
