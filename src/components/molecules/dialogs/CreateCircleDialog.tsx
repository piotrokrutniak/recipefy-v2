"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateCircleForm } from "@/components/organisms/forms/CreateCircleForm";
import { PlusIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";

export const CreateCircleDialog = () => {
  const [open, setOpen] = useState(false);
  const t = useTranslations("recipes.circles");

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        <PlusIcon className="mr-1 w-4 h-4" />
        {t("createButton")}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("createTitle")}</DialogTitle>
          </DialogHeader>
          <CreateCircleForm onSuccess={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
};
