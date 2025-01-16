import { EmptyResultsIndicator } from "@/components/atoms/EmptyResultsIndicator";
import { OutlineContainer } from "@/components/atoms/OutlineContainer";
import { UserHeaderServer } from "@/components/features/profile/UserHeaderServer";
import { TextH2, TextP } from "@/components/typography";
import { User } from "@prisma/client";

export const CircleMembers = ({ members }: { members: User[] }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <TextH2 className="w-full">Members</TextH2>
      {members.map((member) => (
        <CircleMemberEntry key={member.id} member={member} />
      ))}
      {!members.length && <EmptyResultsIndicator message="No members yet" />}
    </div>
  );
};

const CircleMemberEntry = ({ member }: { member: User }) => {
  return (
    <OutlineContainer>
      <UserHeaderServer user={member} />
    </OutlineContainer>
  );
};
