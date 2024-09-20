import { Input } from "@/components/ui/input";

interface LevelFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function LevelFilter(props: LevelFilterProps) {
  return (
    <Input
      placeholder="Filter with levels..."
      value={props.value}
      onChange={(event) => props.onChange(event.target.value)}
      className="max-w-sm"
    />
  );
}
