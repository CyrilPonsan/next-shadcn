"use server";

import { loginFormSchema } from "@/lib/validation/login-form";
import { validationErrors } from "../validate";
import { ZodError } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function registerUser(_prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData);
  try {
    loginFormSchema.parse(data);
  } catch (error: any) {
    if (error instanceof ZodError) {
      return validationErrors(error);
    }
  }
  try {
    const response = await fetch("http://localhost:3000/api/register", {
      headers: { Content: "application/json" },
      method: "POST",
      body: JSON.stringify({ data }),
    });
    const result = await response.json();
    if (!response.ok) throw result;
    return redirect("/");
  } catch (error: any) {
    return [error];
  }
}
