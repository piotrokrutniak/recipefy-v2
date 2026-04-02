"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";
import { createCircleSchema } from "@/lib/server-actions/circles/createCircle.schema";
import { createCircle } from "@/lib/server-actions/circles/createCircle";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export type CreateCircleFormData = z.infer<typeof createCircleSchema>;

export const CreateCircleForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { toast } = useToast();
  const { push, refresh } = useRouter();
  const t = useTranslations("recipes.circles");

  const form = useForm<CreateCircleFormData>({
    resolver: zodResolver(createCircleSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = useCallback(
    async (data: CreateCircleFormData) => {
      try {
        const circle = await createCircle(data);

        if (circle) {
          toast({
            title: "Circle created",
            description: "Your circle has been created",
            variant: "success",
          });
          if (onSuccess) {
            refresh();
            onSuccess();
          } else {
            push("/your-circles");
          }
        } else {
          toast({
            title: "Circle creation failed",
            description: "Please try again",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error(error);
        toast({
          title: "Circle creation failed",
          description: "Please try again",
          variant: "destructive",
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [toast, onSuccess]
  );

  return (
    <Form {...form}>
      <form
        className="flex flex-col w-full max-w-[1024px] gap-4 my-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("nameLabel")}</FormLabel>
              <FormControl>
                <Input placeholder={t("namePlaceholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={form.formState.isSubmitting} type="submit">
          {form.formState.isSubmitting ? t("creating") : t("createButton")}
        </Button>
      </form>
    </Form>
  );
};
