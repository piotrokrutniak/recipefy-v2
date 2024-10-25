import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { LinkButton } from "@/components/generic/LinkButton";
import { TextLead } from "@/components/typography/TextLead";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";

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
  return <SignInMethods />;
  // }
};

const SignInMethods = () => {
  return (
    <section className="flex flex-col gap-2 w-64 place-self-center self-center">
      <Button onClick={() => signIn("google")} className="flex">
        Sign In with Google
      </Button>
      <Button onClick={() => signIn("facebook")}>Sign In with Facebook</Button>
      <TextLead className="text-center">Or</TextLead>
      <LinkButton href="/auth/signin">Sign In</LinkButton>
      {/* Add more sign in buttons here and an alternative credentials form */}
    </section>
  );
};
