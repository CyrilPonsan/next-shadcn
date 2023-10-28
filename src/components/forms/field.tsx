"use client";

import { ChangeEventHandler, useContext } from "react";
import CustomError from "@/types/interfaces/custom-error";
import { FormContext } from "./context/context-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface FieldProps {
  label?: string;
  placeholder?: string;
  name: string;
  type?: string;
}

const Field = (props: FieldProps) => {
  const { label, placeholder, name } = props;
  const type = props.type ?? "text";
  const { values, errors, onChangeValue } = useContext(FormContext);

  const baseStyle = "focus:outline-none";

  const style = errors.find((item) => item.type === name)
    ? baseStyle + " border-destructive"
    : baseStyle;

  return (
    <div className="flex flex-col gap-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        className={style}
        type={type}
        id={name}
        name={name}
        defaultValue={values[name]}
        placeholder={placeholder}
        onChange={(event) => onChangeValue(name, event.currentTarget.value)}
      />
    </div>
  );
};

export default Field;
