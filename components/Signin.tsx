"use client";
import CustomInput from "./FormInputs/CustomInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { DASHBOARD_PAGE, REGISTRATION_PAGE } from "@/config/constants";
import { signinForm, signinSchema } from "@/app/api/lib/types";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import CustomNotification from "./CustomNotification";


const Signin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [nopen, setNopen] = useState(false);
    const [notification, setNotification] = useState({
      message: "",
      variant: "outlined" as "standard" | "outlined" | "filled",
      severity: "success" as "success" | "error" | "warning" | "info",
    });
    const { handleSubmit, control } = useForm<signinForm>({
        resolver: zodResolver(signinSchema),
    });

    const onSubmit: SubmitHandler<signinForm> = async (data) => {
      setLoading(true);
      
      const response = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password:data.password
      });
      if (response?.error === undefined)
        router.push(DASHBOARD_PAGE);
      else if (response?.error === "CredentialsSignin")
      {
        setNotification({ message: "Invalid Credentials", severity: "error", variant: "outlined" })
        setNopen(true);
      }
      else {
        setNotification({
          message: "Signin Failed",
          severity: "error",
          variant: "outlined",
        });
        setNopen(true);
      }
     
   }
    return (
      <div className="flex h-screen bg-slate-100 justify-center items-center">
        <div className=" md:w-75% lg:w-1/4 rounded-lg shadow-lg bg-white">
          <h2 className="text-xl font-bold text-center text-blue-900 my-6 italic">
            Dynamic Pricing Engine
          </h2>
          <h2 className="text-slate-700 text-center font-bold text-xl">
            Sign In
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col mx-6 gap-2 mb-4">
              <CustomInput
                name="email"
                label="Email"
                variant="standard"
                control={control}
                type="email"
              />
              <CustomInput
                name="password"
                label="Password"
                variant="standard"
                control={control}
                type="password"
              />
              <div className="my-4">
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth={true}
                 
                >
                  Sign In
                </Button>
              </div>

              <div className="flex justify-between">
                <p
                  className="text-blue-500 text-sm hover:underline"
                  onClick={() => router.push(REGISTRATION_PAGE)}
                >
                  Register here
                </p>
                <p className="text-blue-500 text-sm hover:underline">
                  Forgot Password ?
                </p>
              </div>
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
}
export default Signin;