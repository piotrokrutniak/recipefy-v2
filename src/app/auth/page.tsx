"use client";
import { Login } from "@/components/auth/Login";
import { PageContentLayout } from "@/components/layouts/PageContentLayout";

export default function LoginPage() {
  return (
    <PageContentLayout>
      <div className="flex justify-center w-full">
        <Login />
      </div>
    </PageContentLayout>
  );
}
