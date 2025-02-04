"use client";

import { CreateCircleInviteSchema } from "@/lib/server-actions/circles/createCircleInvite.schema";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCircleInviteSchema } from "@/lib/server-actions/circles/createCircleInvite.schema";
import {
  Form,
  FormField,
  FormMessage,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { createCircleInvite } from "@/lib/server-actions/circles/createCircleInvite";
import { useCallback, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export const InviteUserToCircleForm = ({ circleId }: { circleId: string }) => {
  const { toast } = useToast();
  const { refresh } = useRouter();

  const form = useForm<CreateCircleInviteSchema>({
    resolver: zodResolver(createCircleInviteSchema),
    defaultValues: {
      inviteeEmail: "",
      circleId: circleId,
    },
  });

  const handleError = useCallback(() => {
    toast({
      title: "Error",
      description: "An error occurred while inviting the user to the circle",
      variant: "destructive",
    });
  }, [toast]);

  const handleSuccess = useCallback(() => {
    toast({
      title: "Success",
      description: "User invited to the circle",
      variant: "success",
    });
    form.reset();
  }, [toast, form]);

  const onSubmit = useCallback(
    async (data: CreateCircleInviteSchema) => {
      console.log(data);
      try {
        const circleInvite = await createCircleInvite(data);
        handleSuccess();
        refresh();
      } catch {
        handleError();
      }
    },
    [handleError, handleSuccess, refresh]
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="inviteeEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={form.formState.isSubmitting} type="submit">
          {form.formState.isSubmitting ? "Inviting..." : "Invite"}
        </Button>
      </form>
    </Form>
  );
};
