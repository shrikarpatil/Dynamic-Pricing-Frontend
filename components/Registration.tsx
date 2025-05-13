"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const regsitrationSchema = z.object({
  firstname: z.string().min(1, "Required"),
  lastname: z.string().min(1, "Required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Required"),
  confirmPassword: z.string().min(1, "Required"),
});
type RegistrationValues = z.infer<typeof regsitrationSchema>;
const Registration = () => {
  const { handleSubmit, register,formState:{errors} } = useForm<RegistrationValues>({
    resolver: zodResolver(regsitrationSchema),
  });
  const onSubmit: SubmitHandler<RegistrationValues> = (data) => {
    console.log(data);
  };
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-1/3 rounded-lg shadow-2xl">
        <h2 className="text-xl font-bold text-center text-slate-700">
          Registration Form
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col mx-6 gap-4 mb-2">
            <TextField
              {...register("firstname")}
              name="firstname"
              label="First Name"
              type="text"
              variant="standard"
              error={!!errors.firstname}
              helperText={errors.firstname?.message}
            />
            <TextField
              {...register("lastname")}
              name="lastname"
              label="Last Name"
              type="text"
              variant="standard"
              error={!!errors.lastname}
              helperText={errors.lastname?.message}
            />
            <TextField
              {...register("email")}
              name="email"
              label="Email"
              type="email"
              variant="standard"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              {...register("password")}
              name="password"
              label="Password"
              type="password"
              variant="standard"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <TextField
              {...register("confirmPassword")}
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              variant="standard"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
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
