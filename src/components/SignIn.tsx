import React, { FC } from "react";
import { Icons } from "./Icons";

interface SignInProps {}

const SignIn: FC<SignInProps> = ({}) => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <Icons.logo className="mx-auto w-6 h-6" />
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm ax-w-xs mx-auto">
          By continuing, you are setting up a Breadit account and agree to our
          UA & PP
        </p>
      </div>
    </div>
  );
};

export default SignIn;
