"use client";
import { ProfileSection } from "./ProfileSection";
import { LabeledInput } from "@/components/generic/LabeledInput";
import { SwitchRow } from "./SwitchRow";
import { TextLarge } from "@/components/typography/TextLarge";
import { useMutationUpdateUser } from "@/hooks/api/users/mutations/useMutationUpdateUser";

export const AccountDetailsSection = () => {
  return (
    <ProfileSection header="Account Details">
      <TextLarge>Security</TextLarge>
      <LabeledInput
        className="max-w-[500px]"
        label="Email"
        placeholder="email@example.com"
        type="email"
        disabled
      />
      <LabeledInput
        className="max-w-[500px]"
        label="Password"
        placeholder="••••••••••••"
        type="password"
        disabled
      />
      <TextLarge>Profile Customization</TextLarge>
      <UpdateBioInput />
      <SwitchRow
        name="restrictRecipesVisibility"
        label="Restrict Recipes Visibility"
      />
    </ProfileSection>
  );
};

const UpdateBioInput = () => {
  const { mutate } = useMutationUpdateUser();

  return (
    <LabeledInput
      className="max-w-[500px]"
      label="Bio"
      placeholder="Enter bio other users will see"
      onBlur={(e) => mutate({ bio: e.target.value })}
      type="text"
    />
  );
};
