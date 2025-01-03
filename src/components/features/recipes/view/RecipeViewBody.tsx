import { LinkButton } from "@/components/generic/LinkButton";
import { MarkupRenderer } from "@/components/molecules/markup/MarkdownRenderer";
import { TextH1 } from "@/components/typography/TextH1";
import { TextLead } from "@/components/typography/TextLead";
import { TextP } from "@/components/typography/TextP";
import { Button } from "@/components/ui/button";
import { Recipe, User } from "@prisma/client";
import { FaEdit, FaTrash } from "react-icons/fa";

export const RecipeViewBody = ({
  recipe,
  user,
}: {
  recipe: Recipe;
  user: User | null;
}) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <TextH1>{recipe.title}</TextH1>
      <TextLead>{recipe.visibility}</TextLead>
      {user?.id === recipe.authorId && <AuthorControls recipe={recipe} />}
      <div className="flex flex-col">
        <TextP noLeading>{`Prep Time: ${recipe.prepTime} minutes`}</TextP>
        <TextP noLeading>{`Cook Time: ${recipe.cookTime} minutes`}</TextP>
      </div>
      <MarkupRenderer content={recipe.content} />
    </div>
  );
};

const AuthorControls = ({ recipe }: { recipe: Recipe }) => {
  return (
    <div className="flex flex-row gap-2 items-center">
      <LinkButton
        href={`/recipes/${recipe.id}/edit`}
        variant="default"
        size="default"
        className="w-fit gap-2"
      >
        <FaEdit />
        Edit
      </LinkButton>
      <Button variant="destructive" size="default" className="w-fit gap-2">
        <FaTrash />
        Delete
      </Button>
    </div>
  );
};
