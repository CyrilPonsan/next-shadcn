"use client";

import React from "react";
import { signOut } from "next-auth/react";

const SignOutPage = () => {
  signOut({ callbackUrl: "/" });

  return <div>logout</div>;
};

export default SignOutPage;
