import React, { FC } from "react";
import { Icons } from "./Icons";
import Link from "next/link";
import UserAuthForm from "./form/UserAuthForm";

interface SignUpProps {}

const SignUp: FC<SignUpProps> = ({}) => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <Icons.logo className="mx-auto w-6 h-6" />
        <h1 className="text-2xl font-semibold tracking-tight">Sign up</h1>
        <p className="text-sm ax-w-xs mx-auto">
          By continuing, you are setting up a Breadit account and agree to our
          UA & PP
        </p>

        {/* sign-in form */}
        <UserAuthForm />

        <p className="px-8 text-center text-sm text-zinc-700">
          Aldready a Breadittor?{" "}
          <Link
            href="/sign-in"
            className="hover:text-zinc-800 text-sm underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
