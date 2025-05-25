"use client";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

type CustomInputProps = {
  name: string;
  control: any;
  label: any; 
  [x: string]: any;
};

const CustomInput = ({ name, control, label,...props }:CustomInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          label={label}
          value={field.value ?? ""}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}    
          {...props}
        />
      )}
    />
  );
};

export default CustomInput;
