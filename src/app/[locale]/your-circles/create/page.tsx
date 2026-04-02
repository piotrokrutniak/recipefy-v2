"use client";

import { CreateCircleForm } from "@/components/organisms/forms/CreateCircleForm";
import { ClientProvidersWrapper } from "@/components/providers/ProvidersWrapper";

export default function CreateCirclePage() {
  return (
    <ClientProvidersWrapper>
      <CreateCircleForm />
    </ClientProvidersWrapper>
  );
}
