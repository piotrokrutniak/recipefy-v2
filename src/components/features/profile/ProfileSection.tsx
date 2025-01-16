import { TextH2 } from "@/components/typography/TextH2";
import { ReactNode } from "react";

export const ProfileSection = ({
  header,
  children,
}: {
  header?: string;
  children?: ReactNode;
}) => {
  return (
    <section className="flex flex-col gap-8 w-full place-self-center self-center">
      {!!header && <TextH2 className="pb-2">{header}</TextH2>}
      {children}
    </section>
  );
};
