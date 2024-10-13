import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { TextLead } from "../typography/TextLead";
import { LinkButton } from "../generic/LinkButton";

export const Login = () => {
  const { data: session } = useSession();

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
