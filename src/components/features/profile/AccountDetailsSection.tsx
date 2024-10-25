import { ProfileSection } from "./ProfileSection";
import { LabeledInput } from "@/components/generic/LabeledInput";
import { SwitchRow } from "./SwitchRow";

export const AccountDetailsSection = () => {
  return (
    <ProfileSection header="Account Details">
      <LabeledInput className="max-w-[500px]" label="Email" placeholder="email@example.com" type="email" disabled />
      <LabeledInput className="max-w-[500px]" label="Password" placeholder="••••••••••••" type="password" disabled />
      <SwitchRow name="restrictRecipesVisibility" label="Restrict Recipes Visibility" />
    </ProfileSection>
  );
};