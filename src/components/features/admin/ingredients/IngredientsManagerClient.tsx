"use client";

import { useEffect, useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { Ingredient } from "@prisma/client";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { createIngredient } from "@/lib/server-actions/ingredients/createIngredient";
import { updateIngredient } from "@/lib/server-actions/ingredients/updateIngredient";
import { deleteIngredient } from "@/lib/server-actions/ingredients/deleteIngredient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ActionConfirmationDialog } from "@/components/molecules/dialogs/ActionConfirmationDialog";
import { FaLeaf, FaSeedling } from "react-icons/fa";
import { Pencil, Plus, Trash2 } from "lucide-react";

export const IngredientsManagerClient = ({
  initialIngredients,
}: {
  initialIngredients: Ingredient[];
}) => {
  const t = useTranslations("admin.ingredients");
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const [ingredients, setIngredients] =
    useState<Ingredient[]>(initialIngredients);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Ingredient | null>(null);

  const [formName, setFormName] = useState("");
  const [formVegan, setFormVegan] = useState(false);
  const [formVegetarian, setFormVegetarian] = useState(false);

  useEffect(() => {
    if (dialogOpen) {
      if (editTarget) {
        setFormName(editTarget.name);
        setFormVegan(editTarget.vegan);
        setFormVegetarian(editTarget.vegetarian);
      } else {
        setFormName("");
        setFormVegan(false);
        setFormVegetarian(false);
      }
    }
  }, [dialogOpen, editTarget]);

  const filteredIngredients = ingredients.filter((ingredient) =>
    ingredient.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = () => {
    startTransition(async () => {
      try {
        if (editTarget) {
          const updated = await updateIngredient(
            editTarget.id,
            formName,
            formVegan,
            formVegetarian
          );
          setIngredients((prev) =>
            prev.map((i) => (i.id === updated.id ? updated : i))
          );
        } else {
          const created = await createIngredient(
            formName,
            formVegan,
            formVegetarian
          );
          setIngredients((prev) => [...prev, created]);
        }
        setDialogOpen(false);
        toast({ title: t("saveSuccess") });
      } catch {
        toast({ title: t("deleteError"), variant: "destructive" });
      }
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      try {
        await deleteIngredient(id);
        setIngredients((prev) => prev.filter((i) => i.id !== id));
        toast({ title: t("deleteSuccess") });
      } catch {
        toast({ title: t("deleteError"), variant: "destructive" });
      }
    });
  };

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <Button
          onClick={() => {
            setEditTarget(null);
            setDialogOpen(true);
          }}
        >
          <Plus className="w-4 h-4 mr-1" />
          {t("add")}
        </Button>
      </div>

      <Input
        placeholder={t("search")}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("name")}</TableHead>
            <TableHead>{t("vegan")}</TableHead>
            <TableHead>{t("vegetarian")}</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredIngredients.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-muted-foreground py-8"
              >
                {t("noResults")}
              </TableCell>
            </TableRow>
          ) : (
            filteredIngredients.map((ingredient) => (
              <TableRow key={ingredient.id}>
                <TableCell className="font-medium">{ingredient.name}</TableCell>
                <TableCell>
                  {ingredient.vegan ? (
                    <FaLeaf className="w-4 h-4 text-green-600" />
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </TableCell>
                <TableCell>
                  {ingredient.vegetarian ? (
                    <FaSeedling className="w-4 h-4 text-green-600" />
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </TableCell>
                <TableCell className="flex items-center gap-2 justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditTarget(ingredient);
                      setDialogOpen(true);
                    }}
                  >
                    <Pencil className="w-4 h-4" />
                    <span className="sr-only">{t("edit")}</span>
                  </Button>
                  <ActionConfirmationDialog
                    title={t("deleteTitle")}
                    description={t("deleteConfirm")}
                    confirmButtonText={t("delete")}
                    cancelButtonText={t("deleteCancel")}
                    confirmButtonVariant="destructive"
                    onConfirm={() => handleDelete(ingredient.id)}
                    triggerButton={
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4 text-destructive" />
                        <span className="sr-only">{t("delete")}</span>
                      </Button>
                    }
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editTarget ? t("editTitle") : t("addTitle")}
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4 pt-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">{t("name")}</label>
              <Input
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder={t("name")}
                required
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setFormVegan((v) => !v)}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm border transition-colors",
                  formVegan
                    ? "bg-green-100 border-green-500 text-green-700"
                    : "border-input text-muted-foreground"
                )}
              >
                <FaLeaf className="w-3.5 h-3.5" />
                {t("vegan")}
              </button>

              <button
                type="button"
                onClick={() => setFormVegetarian((v) => !v)}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm border transition-colors",
                  formVegetarian
                    ? "bg-green-100 border-green-500 text-green-700"
                    : "border-input text-muted-foreground"
                )}
              >
                <FaSeedling className="w-3.5 h-3.5" />
                {t("vegetarian")}
              </button>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setDialogOpen(false)}
                disabled={isPending}
              >
                {t("cancel")}
              </Button>
              <Button
                onClick={handleSave}
                disabled={isPending || !formName.trim()}
              >
                {t("save")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
