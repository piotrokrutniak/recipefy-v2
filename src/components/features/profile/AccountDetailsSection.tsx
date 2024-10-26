import { ProfileSection } from "./ProfileSection";
import { LabeledInput } from "@/components/generic/LabeledInput";
import { SwitchRow } from "./SwitchRow";
import { TextLarge } from "@/components/typography/TextLarge";

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
      <LabeledInput
        className="max-w-[500px]"
        label="Bio"
        placeholder="Enter bio other users will see"
        type="text"
      />
      <SwitchRow
        name="restrictRecipesVisibility"
        label="Restrict Recipes Visibility"
      />
    </ProfileSection>
  );
};

const UpdateBioForm = () => {

};