import { InputHTMLAttributes } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export const LabeledInput = ({
  label,
  ...props
}: { label: string } & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={props.name}>{label}</Label>
      <Input {...props} />
    </div>
  );
};
