"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useContext } from "react";
import { SpinnerButton } from "./spinner-button";
import { FormContext } from "./forms/context/context-form";
import Link from "next/link";
import Field from "./forms/field";
import { validateForm } from "@/utils/validate";
import { loginFormSchema } from "@/lib/validation/login-form";
import CustomError from "@/types/interfaces/custom-error";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get("callbackUrl") || `/dashboard`;
  const {
    isLoading,
    values,
    errors,
    setIsLoading,
    onValidationErrors,
    onHasBeenSubmitted,
  } = useContext(FormContext);

  const loginUser = async (event: React.FormEvent) => {
    event.preventDefault();
    onValidationErrors([]);
    onHasBeenSubmitted(true);

    const errors = validateForm(loginFormSchema, {
      email: values.email,
      password: values.password,
    }) as CustomError[];

    console.log({ errors });

    if (errors?.length > 0) {
      onValidationErrors(errors);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: true,
      callbackUrl,
    });
    setIsLoading(false);
    router.push(`/dashboard`);
  };

  return (
    <form
      className="w-5/6 md:w-3/6 xl:w-3/12 2xl:w-3/12 flex flex-col gap-y-4"
      onSubmit={loginUser}
    >
      <h1 className="text-2xl font-extrabold">Connexion</h1>

      {errors.length > 0 ? (
        <>
          <div className="flex justify-start">
            <p className="text-destructive text-sm font-bold">
              {errors[0].message}
            </p>
          </div>
        </>
      ) : null}

      <Field name="email" type="email" placeholder="jean.dupont@exemple.fr" />

      <Field name="password" type="password" />

      <Link className="text-xs text-center hover:underline" href="#">
        {"Besoin d'aide ?"}
      </Link>

      <div className="divider" />

      <SpinnerButton state={isLoading} name="Connexion" />
    </form>
  );
};

export default LoginForm;
