import { Login } from "@/components/features/auth/Login";
import { PageContentLayout } from "@/components/layouts/PageContentLayout";
import { getCurrentUser } from "../api/users/current/route";
import { redirect } from "next/navigation";
import { TextH1 } from "@/components/typography/TextH1";

export default async function LoginPage() {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    return redirect("/profile");
  }

  return (
    <PageContentLayout>
      <div className="flex flex-1 justify-center w-full">
        <Login />
      </div>
    </PageContentLayout>
  );
}
