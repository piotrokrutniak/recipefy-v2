"use client";

import {
  TextLarge,
  TextMedium,
  TextP,
  TextSmall,
} from "@/components/typography";
import { TextH2 } from "@/components/typography/TextH2";
import { TextLead } from "@/components/typography/TextLead";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";

export const Login = () => {
  // const session = await getServerSession(authOptions);

  // if (session && session.user) {
  //   return (
  //     <div>
  //       <p>You are logged in as {session.user.email} 👋</p>
  //       <Button onClick={() => signOut()}>Sign Out</Button>
  //     </div>
  //   );
  // } else {
  return (
    <div className="flex flex-col gap-2 p-3">
      <TextH2>Sign In</TextH2>
      <TextMedium>
        Sign in to enjoy the full experience of Recipefy and create your own
        recipes!
      </TextMedium>
      <TextSmall className="text-gray-500 mt-2">
        By signing in, you agree to our{" "}
        <Link href="/terms" className="underline hover:text-light_red-500">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline hover:text-light_red-500">
          Privacy Policy
        </Link>
        .
      </TextSmall>
      <SignInMethods />
    </div>
  );
  // }
};

const SignInMethods = () => {
  return (
    <section className="flex flex-col gap-2 w-full sm:w-64 mt-6 sm:place-self-center self-center">
      <Button onClick={() => signIn("google")} className="flex h-12">
        <FaGoogle className="mr-2" />
        Sign In with Google
      </Button>
      {/* <Button onClick={() => signIn("facebook")}>Sign In with Facebook</Button> */}
      {/* <TextLead className="text-center">Or</TextLead> */}
      {/* <LinkButton href="/auth/signin">Sign In</LinkButton> */}
      {/* Add more sign in buttons here and an alternative credentials form */}
    </section>
  );
};
