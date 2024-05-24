import React from "react";
import { MUITextField } from "../MUITextField";
import {
  FieldValues,
  Path,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { MenuItem, TextFieldProps } from "@mui/material";
type GenderSelectProps<T extends FieldValues> = Omit<TextFieldProps, "name"> & {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: string | undefined;
  watch: UseFormWatch<T>;
};
import WcIcon from "@mui/icons-material/Wc";
import { genderOptions } from "./options";

export const GenderSelect = <T extends FieldValues>({
  ...props
}: GenderSelectProps<T>) => {
  return (
    <MUITextField {...props} select icon={<WcIcon />}>
      {genderOptions.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </MUITextField>
  );
};
