import { MarkupRenderer } from "@/components/molecules/markup/MarkdownRenderer";
import { TextH1 } from "@/components/typography/TextH1";
import { TextLead } from "@/components/typography/TextLead";
import { TextP } from "@/components/typography/TextP";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RecipeFullInfoDto } from "@/types/api";
import { User } from "@prisma/client";
import Link from "next/link";
import { AuthorControls } from "./AuthorControlsClient";

// TODO: Add mobile layout with foldable sections
export const RecipeViewBody = ({
  recipe,
  user,
}: {
  recipe: RecipeFullInfoDto;
  user: User | null;
}) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <TextH1>{recipe.title}</TextH1>
      <Link
        href={`/user/${recipe.authorId}`}
        className="flex place-items-center w-fit gap-2"
      >
        <Avatar>
          <AvatarImage src={recipe.author?.image || ""} />
          <AvatarFallback>{recipe.author?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        {recipe.author?.name}
      </Link>
      <div className="flex flex-col">
        {!!recipe.prepTime && (
          <TextP noLeading>{`Prep Time: ${recipe.prepTime} minutes`}</TextP>
        )}
        {!!recipe.cookTime && (
          <TextP noLeading>{`Cook Time: ${recipe.cookTime} minutes`}</TextP>
        )}
      </div>
      <TextP noLeading className="mb-4">{`${recipe.description}`}</TextP>
      <MarkupRenderer content={recipe.content} />
    </div>
  );
};
