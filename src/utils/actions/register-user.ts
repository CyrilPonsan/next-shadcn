"use server";

import { loginFormSchema } from "@/lib/validation/login-form";
import { validationErrors } from "../validate";
import { ZodError } from "zod";
import { revalidatePath } from "next/cache";

export async function registerUser(_prevState: any, formData: FormData) {
  try {
    const data = Object.fromEntries(formData);
    console.log({ data });

    loginFormSchema.parse(data);
    const response = await fetch("/api/register", {
      headers: { Content: "application/json" },
      method: "POST",
      body: JSON.stringify({ data }),
    });
    const result = response.json();
    console.log({ result });

    return revalidatePath("/");
  } catch (error: any) {
    if (error instanceof ZodError) {
      return validationErrors(error);
    }
  }
}
