import { EmptyResultsIndicator } from "@/components/atoms/EmptyResultsIndicator";
import { OutlineContainer } from "@/components/atoms/OutlineContainer";
import { UserHeaderServer } from "@/components/features/profile/UserHeaderServer";
import { TextH2, TextLarge, TextP, TextSmall } from "@/components/typography";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CircleMemberFullInfoDto } from "@/types/api";
import { User } from "@prisma/client";
import { FaUserMinus } from "react-icons/fa";

export const CircleMembers = ({
  members,
}: {
  members: CircleMemberFullInfoDto[];
}) => {
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

const CircleMemberEntry = ({ member }: { member: CircleMemberFullInfoDto }) => {
  return (
    <OutlineContainer className="flex gap-2 items-center justify-between">
      <div className="flex gap-2 items-center">
        <Avatar className="w-12 h-12">
          <AvatarImage src={member.user.image ?? undefined} />
        </Avatar>
        <div className="flex flex-col justify-center">
          <TextLarge>{member.user.name}</TextLarge>
          <TextSmall>{`member since ${member.createdAt.toLocaleDateString()}`}</TextSmall>
        </div>
      </div>
      <Button variant="outline">
        <FaUserMinus className="w-4 h-4 mr-2" />
        Remove
      </Button>
    </OutlineContainer>
  );
};
