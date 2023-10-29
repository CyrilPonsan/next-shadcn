"use client";

import React from "react";
import { useFormState, useFormStatus } from "react-dom";

import { SpinnerButton } from "./spinner-button";
import { registerUser } from "@/utils/actions/register-user";
import CustomError from "@/types/interfaces/custom-error";
import Field from "./forms/field";

const initialState: CustomError[] = [];

const RegisterForm = () => {
  const [state, formAction] = useFormState(registerUser, initialState);
  const { pending } = useFormStatus();

  console.log({ state });

  return (
    <section className="w-full min-h-[70vh] flex flex-col justify-center items-center">
      <form
        className="w-5/6 md:w-3/6 xl:w-3/12 2xl:w-3/12 flex flex-col items-center gap-y-4"
        action={formAction}
      >
        <div className="w-full flex justify-start my-4">
          <h1 className="text-2xl font-extrabold">Inscription</h1>
        </div>

        {state && state.length > 0 ? (
          <p className="w-full text-destructive text-xs font-bold mb-4">
            {state[0].message}
          </p>
        ) : null}

        <Field
          label="Adresse Email"
          name="email"
          type="text"
          placeholder="ex : jean.dupont@exemple.fr"
          errors={state ?? []}
        />

        <Field
          label="Mot de Passe"
          name="password"
          type="password"
          errors={state ?? []}
        />

        <div className="w-full mt-4">
          <SpinnerButton state={pending} name="Connexion" />
        </div>
      </form>
    </section>
  );
};

export default RegisterForm;
