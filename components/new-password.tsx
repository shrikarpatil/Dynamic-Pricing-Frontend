"use client"

import { getData, updateData } from "@/actions/crud-actions";
import { USER_AUTH_API } from "@/config/api-endpoints";
import { useLoading } from "@/hooks/context/LoadingContext";
import { useNotification } from "@/hooks/context/NotificationContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import CustomInput from "./FormInputs/CustomInput";
import { Button } from "@mui/material";
import bcrypt from "bcryptjs";

const newPasswordSchema = z.object({
    newPassword: z.string().min(1, "Required"),
    confirmPassword: z.string().min(1, "Required"),
});

type newPasswordType = z.infer<typeof newPasswordSchema>;

const NewPassword = () => {
    const { setLoading: setModalLoading } = useLoading();
    const { setNotificationData: notification } = useNotification();
    const searchParams = useSearchParams();
    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
      const getUser = async () => {
        try {
          const token = searchParams.get("token");
          console.log("token:", token);

          if (!token) {
            notification({
              message: "Missing token",
              variant: "outlined",
              severity: "error",
            });
            return;
          }

          const response = await getData(
            `${USER_AUTH_API}?password_reset_token=${token}`
          );
          console.log(response);

          if (response?.status === 200) {
            setEmail(response.data.email);
          } else if (response?.status === 404) {
            notification({
              message: "Invalid Token",
              variant: "outlined",
              severity: "error",
            });
          }
        } catch (error) {
          console.error("Error fetching user:", error);
          notification({
            message: "Something went wrong",
            variant: "outlined",
            severity: "error",
          });
        } finally {
          setModalLoading(false);
        }
      };

      getUser();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const { handleSubmit, control } = useForm({
        resolver:zodResolver(newPasswordSchema),
    });
    console.log(email);
    const onSubmit: SubmitHandler<newPasswordType> = async (data) => {
        if (data.newPassword === data.confirmPassword) {
            try {
                setModalLoading(true);
                setLoading(true);
                const newPassword = await bcrypt.hash(data.newPassword, 10)
                await updateData(`${USER_AUTH_API}?email=${email}`, { password: newPassword })
                notification({
                    message: "Password Updated Successfully.",
                    variant: "outlined",
                    severity: "success",
                });
            }
            catch {
                notification({
                    message: "Password Reset Unsuccessful.",
                    variant: "outlined",
                    severity: "error",
                });
            } finally {
                setModalLoading(false);
                setLoading(false);
            }
        }
        else
        notification({
          message: "Passwords Don't Match",
          variant: "outlined",
          severity: "error",
        });
    }

    return (
        <div className="flex h-screen justify-center items-center bg-slate-100">
        <div className=" lg:w-1/3 shadow-lg rounded-lg">
          <h2 className="text-xl font-bold text-center text-slate-700">
            New Password
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col mx-6 gap-4 mb-2">
              <CustomInput
                name="newPassword"
                label={<p className="text-slate-700"><span className="text-red-500">*</span>New Password</p>}
                control={control}
                variant="standard"
                type="password"
                />
                <CustomInput
                name="confirmPassword"
                label={<p className="text-slate-700"><span className="text-red-500">*</span>Confirm Password</p>}
                control={control}
                variant="standard"
                type="password"
              />
              <Button variant="contained" type="submit" loading={loading} loadingPosition="start">
               {loading?"Reseting...":"Reset Password"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
}
export default NewPassword;