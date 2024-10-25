"use client";
import { Login } from "@/components/features/auth/Login";
import { PageContentLayout } from "@/components/layouts/PageContentLayout";

export default function LoginPage() {
  return (
    <PageContentLayout>
      <div className="flex flex-1 justify-center w-full">
        <Login />
      </div>
    </PageContentLayout>
  );
}
