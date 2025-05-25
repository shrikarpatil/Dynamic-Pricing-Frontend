"use client";

import { useLoading } from "@/hooks/context/LoadingContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import CustomInput from "./FormInputs/CustomInput";
import { Button } from "@mui/material";
import { setPasswordResetToken } from "@/actions/forgotPassword";
import { useNotification } from "@/hooks/context/NotificationContext";

const ForgotPasswordSchema = z.object({
    email: z.string().email("Required"),
});

type ForgotPasswordType = z.infer<typeof ForgotPasswordSchema>;
const ForgotPassword = () => {
    const { setLoading: setModalLoading } = useLoading();
    const { setNotificationData: notification } = useNotification();
    useEffect(() => {
      setModalLoading(false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { handleSubmit, control } = useForm({
        resolver: zodResolver(ForgotPasswordSchema),
    });

    const onSubmit: SubmitHandler < ForgotPasswordType >= async (data)=> {
        try {
            setModalLoading(true);
            const response =  await setPasswordResetToken(data.email);
            if (response?.status == 200)
              notification({
                message: "Mail sent successfully.",
                severity: "success",
                variant: "outlined",
              });
            else if (response?.status == 404)
              notification({
                message: "User Not Found.",
                severity: "error",
                variant: "outlined",
              });
        }
        catch (error)
        {
            notification({
              message: "An Error Occured",
              severity: "error",
              variant: "outlined",
            });
        }
        finally {
            setModalLoading(false);
        }
    }
    return (
      <div className="flex h-screen justify-center items-center bg-slate-100">
        <div className=" lg:w-1/3 shadow-lg rounded-lg">
          <h2 className="text-xl font-bold text-center text-slate-700">
            Forgot Password
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col mx-6 gap-4 mb-2">
              <CustomInput
                name="email"
                label="Email"
                control={control}
                variant="standard"
                type="email"
              />
              <Button variant="contained" type="submit">
                Send Password Reset Link
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
}
export default ForgotPassword;