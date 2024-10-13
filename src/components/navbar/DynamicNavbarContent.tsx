// "use client";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { LinkButton } from "../generic/LinkButton";
import { Avatar, AvatarImage } from "../ui/avatar";

export const DynamicNavbarContent = async () => {
  const session = await getServerSession(authOptions);

  return session?.user ? (
        <>
          <LinkButton href={"/profile"} variant={"outline"}>
            Profile
          </LinkButton>
          <Avatar>
            <AvatarImage src={session.user.image ?? undefined} alt={session.user.name ?? 'avatar'} />
          </Avatar>
        </>
      ) : (
        <>
          <LinkButton href={"/auth"} variant={"outline"}>
            Sign In
          </LinkButton>
          <LinkButton href={"/"}>Sign Up</LinkButton>
        </>
      )
  };
