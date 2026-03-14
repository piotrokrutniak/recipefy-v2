import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { FaLightbulb, FaUser, FaUsers } from "react-icons/fa";

export const ProfileSideBarNavigation = () => {
  return (
    <>
      <Command>
        <CommandList>
          <CommandGroup heading="Settings">
            <CommandItem className="gap-2" asChild>
              <a href="#account-details">
                <FaUser />
                <span>Account Details</span>
              </a>
            </CommandItem>
            <CommandItem className="gap-2" asChild>
              <a href="#recipe-suggestions">
                <FaLightbulb />
                <span>Recipe Suggestions</span>
              </a>
            </CommandItem>
            <CommandItem className="gap-2" asChild>
              <a href="#circles">
                <FaUsers />
                <span>Circles</span>
              </a>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </>
  );
};
