import { Circle } from "@prisma/client";
import { TextH2 } from "@/components/typography";
import { CircleThumbnailPanel } from "../panels/CircleThumbnailPanel";
import { EmptyResultsIndicator } from "@/components/atoms/EmptyResultsIndicator";

export const CirclesSummary = ({
  circles,
  headerText,
  emptyMessage,
}: {
  circles: Circle[];
  headerText?: string;
  emptyMessage?: string;
}) => {
  return (
    <div className="flex flex-col gap-8 items-center">
      {!!headerText && <TextH2>{headerText}</TextH2>}
      <div className="flex flex-wrap gap-4 ">
        {circles.map((circle) => (
          <CircleThumbnailPanel key={circle.id} circle={circle} />
        ))}
        {circles.length === 0 && (
          <EmptyResultsIndicator message={emptyMessage} />
        )}
      </div>
    </div>
  );
};
