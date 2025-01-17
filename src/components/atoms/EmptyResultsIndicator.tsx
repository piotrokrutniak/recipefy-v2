import { TextP } from "../typography";

export const EmptyResultsIndicator = ({
  message = "No results",
}: {
  message?: string;
}) => {
  return (
    <TextP className="text-center py-8" noLeading>
      {message}
    </TextP>
  );
};
