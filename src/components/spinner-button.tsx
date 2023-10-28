import { Loader2 } from "lucide-react";
import { Button, type ButtonProps } from "./ui/button";

interface SpinnerButtonProps extends ButtonProps {
  state: boolean;
  name: string;
}

export const SpinnerButton = ({
  state,
  name,
  ...props
}: SpinnerButtonProps) => {
  console.log(state);

  return (
    <Button>
      {state ? (
        <Loader2 className="h-6 w-6 animate-spin" />
      ) : (
        <span>{name}</span>
      )}
    </Button>
  );
};
