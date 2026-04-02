import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { AssignCirclesToRecipeForm } from "@/components/organisms/forms/AssignCirclesToRecipeForm";
import { Circle } from "@prisma/client";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { TextMuted } from "@/components/typography";

export const ManageRecipeCirclesDialog = ({
  recipeId,
  circleIds,
  circles,
}: {
  recipeId: string;
  circleIds: string[];
  circles: Circle[];
}) => {
  const t = useTranslations("recipes.detail");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{t("manageAccess")}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("manageAccess")}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {t("manageAccessDesc")}
        </DialogDescription>
        {circles.length === 0 ? (
          <div className="flex flex-col items-start gap-3 py-2">
            <TextMuted>{t("noCircles")}</TextMuted>
            <Button variant="outline" asChild>
              <Link href="/your-circles" target="_blank">
                {t("goToCircles")}
                <ExternalLinkIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        ) : (
          <AssignCirclesToRecipeForm
            recipeId={recipeId}
            circleIds={circleIds}
            circles={circles}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
