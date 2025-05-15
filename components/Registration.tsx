"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import CustomInput from "./FormInputs/CustomInput";
import { USER_API } from "@/config/api-endpoints";
import { useState } from "react";
import CustomNotification from "./CustomNotification";
import { createData } from "../actions/server-actions/proxy-fetcher";
import { ProxyResponse } from "@/actions/server-actions/proxy-contracts";

const regsitrationSchema = z.object({
  firstname: z.string().min(1, "Required"),
  lastname: z.string().min(1, "Required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Required"),
  confirmPassword: z.string().min(1, "Required"),
});
type RegistrationValues = z.infer<typeof regsitrationSchema>;
const Registration = () => {
  const [nopen, setNopen] = useState(false);
  const [notification, setNotification] = useState({
    message: "",
    variant: "outlined" as "standard" | "outlined" | "filled",
    severity: "success" as "success" | "error" | "warning" | "info",
  });
  const { handleSubmit, control } = useForm<RegistrationValues>({
    resolver: zodResolver(regsitrationSchema),
  });
  const onSubmit: SubmitHandler<RegistrationValues> = async (data) => {
    try {
      console.log(data);
      const response: any = await createData(USER_API, data);
      console.log(response);
      if (response.status === 200) {
        setNotification({
          message: "Registration Successful",
          variant: "outlined",
          severity: "success",
        });
        setNopen(true);
      } else {
        setNotification({
          message: "Registration Failed",
          variant: "outlined",
          severity: "error",
        });
        setNopen(true);
      }
    } catch (error) {
      console.log(error);
      setNotification({
        message: "An error occured",
        variant: "outlined",
        severity: "error",
      });
      setNopen(true);
    }
  };
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-1/3 rounded-lg shadow-2xl">
        <h2 className="text-xl font-bold text-center text-slate-700">
          Registration Form
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col mx-6 gap-4 mb-2">
            <CustomInput
              name="firstname"
              control={control}
              label="First Name"
              variant="standard"
              type="text"
            />
            <CustomInput
              name="lastname"
              control={control}
              label="Last Name"
              variant="standard"
              type="text"
            />
            <CustomInput
              name="email"
              control={control}
              label="Email"
              variant="standard"
              type="email"
            />
            <CustomInput
              name="password"
              control={control}
              label="Set Password"
              variant="standard"
              type="password"
            />
            <CustomInput
              name="confirmPassword"
              control={control}
              label="Confirm Password"
              variant="standard"
              type="password"
            />
            <Button variant="contained" type="submit">
              Register
            </Button>
          </div>
        </form>
      </div>
      <CustomNotification
        open={nopen}
        onClose={() => setNopen(false)}
        {...notification}
      />
    </div>
  );
};
export default Registration;
