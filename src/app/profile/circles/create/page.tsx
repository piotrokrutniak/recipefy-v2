"use client";

import { CreateCircleForm } from "@/components/organisms/forms/CreateCircleForm";
import { ClientProvidersWrapper } from "@/components/providers/ProvidersWrapper";

export const CreateCirclePage = () => {
  return (
    <ClientProvidersWrapper>
      <CreateCircleForm />
    </ClientProvidersWrapper>
  );
};

export default CreateCirclePage;
