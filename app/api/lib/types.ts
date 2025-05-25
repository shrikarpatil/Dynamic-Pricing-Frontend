import { z } from "zod";

export const regsitrationSchema = z.object({
  firstname: z.string().min(1, "Required"),
  lastname: z.string().min(1, "Required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Required"),
  confirmPassword: z.string().min(1, "Required"),
});
export type RegistrationValues = z.infer<typeof regsitrationSchema>;

export const signinSchema = z.object({
  email: z.string().email("Required"),
  password: z.string().min(1, "Required"),
});

export type signinForm = z.infer<typeof signinSchema>;

export type NotificationType = {
  message: string;
  variant: "standard" | "outlined" | "filled";
  severity: "success" | "error" | "warning" | "info";
};
