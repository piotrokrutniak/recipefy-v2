import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const SwitchRow = ({label, name, onChange}: { label: string; name?: string; onChange?: () => void; }) => {
  return (
    <div className="flex items-center gap-2 ml-4">
      <Switch name={name} onChange={onChange} />
      <Label htmlFor={name}>{label}</Label>
    </div>
  );
};