import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { FaLightbulb, FaUser, FaUsers } from "react-icons/fa"

export const ProfileSideBarNavigation = () => {
  return (
    <>
    <Command>
      <CommandList>
        <CommandGroup heading="Settings">
          <CommandItem className="gap-2">
            <FaUser />
            <span>Account Details</span>
          </CommandItem>
          <CommandItem className="gap-2">
            <FaLightbulb />
            <span>Recipe Suggestions</span>
          </CommandItem>
          <CommandItem className="gap-2">
            <FaUsers />
            <span>Teams</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
    </>
  )
}