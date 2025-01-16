import { ProfileSection } from "./ProfileSection";
import { Circle, CircleInvite } from "@prisma/client";
import { TextH2, TextH4, TextMedium } from "@/components/typography";
import { ChevronRightIcon, PlusIcon } from "@radix-ui/react-icons";
import { LinkButton } from "@/components/generic/LinkButton";
import { OutlineContainer } from "@/components/atoms/OutlineContainer";

export const CirclesSection = ({ circles }: { circles: Circle[] }) => {
  return (
    <ProfileSection header="Circles" id="circles">
      <CirclesHeader />
      <div className="flex flex-col gap-4 p-4">
        {circles.map((circle) => (
          <CircleListing key={circle.id} circle={circle} />
        ))}
        {!circles.length && (
          <TextMedium className="text-center py-8">
            No circles created by you
          </TextMedium>
        )}
      </div>
    </ProfileSection>
  );
};

const CirclesHeader = () => {
  return (
    <div className="flex gap-4 justify-between items-center max-w-full">
      <TextH2>Circles Created by You</TextH2>
      <LinkButton href="/profile/circles/create" variant="outline">
        <PlusIcon className="w-4 h-4 mr-1" />
        Create Circle
      </LinkButton>
    </div>
  );
};

const CircleListing = ({ circle }: { circle: Circle }) => {
  return (
    <OutlineContainer className="flex flex-1 justify-between items-center">
      <TextH4 className="w-full">{circle.name}</TextH4>
      <LinkButton
        href={`/profile/circles/${circle.id}`}
        size={"icon"}
        variant="ghost"
      >
        <ChevronRightIcon className="w-4 h-4" />
      </LinkButton>
    </OutlineContainer>
  );
};
