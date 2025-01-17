import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import Link from "next/link";
import { FaLightbulb, FaUser, FaUsers } from "react-icons/fa";

export const ProfileSideBarNavigation = () => {
  return (
    <>
      <Command>
        <CommandList>
          <CommandGroup heading="Settings">
            <CommandItem className="gap-2" asChild>
              <Link href="/profile#account-details">
                <FaUser />
                <span>Account Details</span>
              </Link>
            </CommandItem>
            <CommandItem className="gap-2" asChild>
              <Link href="/profile#recipe-suggestions">
                <FaLightbulb />
                <span>Recipe Suggestions</span>
              </Link>
            </CommandItem>
            <CommandItem className="gap-2" asChild>
              <Link href="/profile#circles">
                <FaUsers />
                <span>Circles</span>
              </Link>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </>
  );
};
