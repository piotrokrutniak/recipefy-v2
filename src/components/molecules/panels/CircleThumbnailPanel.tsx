import { OutlineContainer } from "@/components/atoms/OutlineContainer";
import { LinkButton } from "@/components/generic/LinkButton";
import { TextH3 } from "@/components/typography";
import { Circle } from "@prisma/client";

export const CircleThumbnailPanel = ({ circle }: { circle: Circle }) => {
  return (
    <>
      <LinkButton
        href={`/your-circles/${circle.id}`}
        className="w-[200px] h-[200px] aspect-square flex flex-col justify-center items-center text-white hover:shadow-lg"
        variant="default"
      >
        <TextH3 className="w-[168px] text-center overflow-hidden text-nowrap text-ellipsis">
          {circle.name}
        </TextH3>
      </LinkButton>
    </>
  );
};
