import { TextH2 } from "@/components/typography/TextH2";
import { ReactNode } from "react";

export const ProfileSection = ({
  header,
  children,
  id,
}: {
  header?: string;
  children?: ReactNode;
  id?: string;
}) => {
  return (
    <section
      className="flex flex-col gap-8 w-full place-self-center self-center"
      id={id}
    >
      {!!header && <TextH2 className="pb-2">{header}</TextH2>}
      {children}
    </section>
  );
};
