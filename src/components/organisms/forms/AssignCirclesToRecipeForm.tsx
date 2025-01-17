"use client";

import { TextMuted } from "@/components/typography";
import { TextH3 } from "@/components/typography/TextH3";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { assignCirclesToRecipe } from "@/lib/server-actions/recipes/assignCirclesToRecipe";
import {
  assignCirclesToRecipeSchema,
  AssignCirclesToRecipeSchema,
} from "@/lib/server-actions/recipes/assignCirclesToRecipe.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Circle } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export const AssignCirclesToRecipeForm = ({
  recipeId,
  circleIds,
  circles,
}: {
  recipeId: string;
  circleIds: string[];
  circles: Circle[];
}) => {
  const { toast } = useToast();
  const form = useForm<AssignCirclesToRecipeSchema>({
    resolver: zodResolver(assignCirclesToRecipeSchema),
    defaultValues: {
      circleIds,
      recipeId,
    },
  });

  const { refresh } = useRouter();

  const onSubmit = async (data: AssignCirclesToRecipeSchema) => {
    try {
      await assignCirclesToRecipe(data);
      toast({
        title: "Circles assigned",
        description: "The circles have been assigned to the recipe.",
      });
      refresh();
    } catch (error) {
      toast({ title: "Error", description: "An error occurred." });
    }
  };

  const onCheckboxChange = (circleId: string) => {
    if (form.getValues("circleIds").includes(circleId)) {
      form.setValue(
        "circleIds",
        form.getValues("circleIds").filter((id) => id !== circleId)
      );
    } else {
      form.setValue("circleIds", [...form.getValues("circleIds"), circleId]);
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col w-full max-w-[1024px] gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2 max-h-[200px] overflow-y-auto">
          {circles.map((circle) => (
            <CircleCheckbox
              key={circle.id}
              circle={circle}
              onChange={onCheckboxChange}
              isChecked={form.getValues("circleIds").includes(circle.id)}
            />
          ))}
        </div>
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Assigning..." : "Assign"}
        </Button>
      </form>
    </Form>
  );
};

const CircleCheckbox = ({
  circle,
  onChange,
  isChecked,
}: {
  circle: Circle;
  onChange: (circleId: string) => void;
  isChecked: boolean;
}) => {
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id={circle.id}
        name={circle.name}
        onClick={() => onChange(circle.id)}
        defaultChecked={isChecked}
      />
      <Label htmlFor={circle.id}>{circle.name}</Label>
    </div>
  );
};

const useFormStatus = () => {};
