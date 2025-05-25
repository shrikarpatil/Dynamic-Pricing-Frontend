"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import CustomInput from "./FormInputs/CustomInput";
import { useEffect, useState } from "react";
import { RegisterNewUser } from "@/actions/registration";
import { RegistrationValues, regsitrationSchema } from "@/app/api/lib/types";
import { useLoading } from "@/hooks/context/LoadingContext";
import { useNotification } from "@/hooks/context/NotificationContext";

const Registration = () => {
  const { setLoading: setModalLoading } = useLoading();
  useEffect(() => {
    setModalLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const { setNotificationData: notification } = useNotification();
  const { handleSubmit, control } = useForm<RegistrationValues>({
    resolver: zodResolver(regsitrationSchema),
  });
  const onSubmit: SubmitHandler<RegistrationValues> = async (data) => {
    try {
      setModalLoading(true);
      if (data.password === data.confirmPassword) {
        const response = await RegisterNewUser(data);
        console.log(response);
        if (response?.status === 200) {
          notification({
            message: "Registration Successful",
            variant: "outlined",
            severity: "success",
          });
        } else if (response?.status === 409) {
          notification({
            message: "User Already Exists.",
            variant: "outlined",
            severity: "info",
          });
        } else {
          notification({
            message: "Registration Failed",
            variant: "outlined",
            severity: "error",
          });
        }
      } else {
        notification({
          message: "Passwords don't match.",
          variant: "outlined",
          severity: "error",
        });
      }
    } catch (error) {
      console.log(error);
      notification({
        message: "Registration failed",
        variant: "outlined",
        severity: "error",
      });
    } finally {
      setModalLoading(false);
    }
  };
  return (
    <div className="flex h-screen justify-center items-center bg-slate-100">
      <div className="lg:w-1/3 rounded-lg shadow-2xl">
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
    </div>
  );
};
export default Registration;
