"use client";

import { loginFormSchema } from "@/lib/validation/login-form";
import { ZodError } from "zod";
import { validationErrors } from "../validate";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function login(_prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData);
  try {
    loginFormSchema.parse(data);
  } catch (error: any) {
    if (error instanceof ZodError) {
      return validationErrors(error);
    }
  }

  const res = await signIn("credentials", {
    email: data.email,
    password: data.password,
    redirect: true,
    callbackUrl: "/dashboard",
  });
  if (!res?.ok) {
    const error = {
      type: "identifiants",
      message: "Email ou mot de passe incorrect",
    };
    return [error];
  }
}
