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
import { useCallback, useState } from "react";
import { createCircleSchema } from "@/lib/server-actions/recipes/createCircle.schema";
import { createCircle } from "@/lib/server-actions/recipes/createCircle";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export type CreateCircleFormData = z.infer<typeof createCircleSchema>;

export const CreateCircleForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { push } = useRouter();

  const form = useForm<CreateCircleFormData>({
    resolver: zodResolver(createCircleSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = useCallback(
    async (data: CreateCircleFormData) => {
      setIsLoading(true);
      try {
        const circle = await createCircle(data);

        if (circle) {
          toast({
            title: "Circle created",
            description: "Your circle has been created",
            variant: "success",
          });
          push("/profile");
        } else {
          toast({
            title: "Circle creation failed",
            description: "Please try again",
            variant: "destructive",
          });
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        toast({
          title: "Circle creation failed",
          description: "Please try again",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [toast]
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
              <FormLabel>Circle name</FormLabel>
              <FormControl>
                <Input placeholder="Circle name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit">
          {isLoading ? "Creating..." : "Create Circle"}
        </Button>
      </form>
    </Form>
  );
};
