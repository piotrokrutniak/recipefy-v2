import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Ingredient, RecipeIngredient } from "@prisma/client";
import { useMemo, useState } from "react";
import {
  IngredientSearchInput,
  SelectableIngredient,
} from "./IngredientSearchContainer";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createUserIngredient } from "@/lib/server-actions/ingredients/createUserIngredient";

type IngredientSearchComboboxProps = {
  selectedIngredient?: RecipeIngredient;
  ingredients: SelectableIngredient[];
  onIngredientClick: (ingredient: SelectableIngredient) => void;
  buttonClassName?: string;
  popoverContentClassName?: string;
  refreshIngredients?: () => void;
  allowAddingUserIngredients?: boolean;
};

export const IngredientSearchCombobox = ({
  selectedIngredient,
  ingredients,
  onIngredientClick,
  buttonClassName,
  popoverContentClassName,
  refreshIngredients,
  allowAddingUserIngredients = false,
}: IngredientSearchComboboxProps) => {
  const [open, setOpen] = useState(false);
  const [isAddingUserIngredient, setIsAddingUserIngredient] = useState(false);

  const handleIngredientSelection = (ingredient: SelectableIngredient) => {
    refreshIngredients?.();
    onIngredientClick(ingredient);
  };

  const openPopover = () => {
    setIsAddingUserIngredient(false);
  };

  //TODO: Remove since it will be obsolete soon
  const memoizedIngredients = useMemo(() => ingredients, [ingredients]);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn("w-[150px] justify-start", buttonClassName)}
          >
            {selectedIngredient?.id ? (
              <>
                {
                  memoizedIngredients.find(
                    (ingredient) =>
                      ingredient.id === selectedIngredient.ingredientId ||
                      ingredient.id === selectedIngredient.userIngredientId
                  )?.name
                }
              </>
            ) : (
              <>+ Select ingredient</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={cn("w-[200px] p-0", popoverContentClassName)}
          align="start"
        >
          <IngredientSearchInput
            setSearchQuery={() => {}}
            ingredients={memoizedIngredients}
            onIngredientClick={handleIngredientSelection}
            onNewIngredientClick={
              allowAddingUserIngredients ? openPopover : undefined
            }
          />
        </PopoverContent>
      </Popover>
      {/** TODO: Possible performance issue here if each ingredient combobox has its own dialog */}
      <AddUserIngredientDialog
        isOpen={isAddingUserIngredient}
        setIsOpen={setIsAddingUserIngredient}
        selectCreatedIngredient={handleIngredientSelection}
      />
    </>
  );
};

const AddUserIngredientDialog = ({
  isOpen,
  setIsOpen,
  selectCreatedIngredient,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectCreatedIngredient: (ingredient: Ingredient) => void;
}) => {
  const [ingredientName, setIngredientName] = useState("");
  const handleIngredientNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIngredientName(e.target.value);
  };

  const handleAddIngredient = async () => {
    const ingredient = await createUserIngredient(ingredientName);
    selectCreatedIngredient(ingredient as Ingredient);
    setIngredientName("");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* <DialogTrigger asChild>
        <Button variant="outline">Add user ingredient</Button>
      </DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add user ingredient</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <Input
            type="text"
            placeholder="Ingredient name"
            value={ingredientName}
            onChange={handleIngredientNameChange}
          />
        </DialogDescription>
        {/* <DialogFooter> */}
        <Button onClick={handleAddIngredient}>Add</Button>
        {/* </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};
