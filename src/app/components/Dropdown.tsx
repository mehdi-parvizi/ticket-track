import { Status } from "@prisma/client";
import { Button, DropdownMenu } from "@radix-ui/themes";

interface Props {
  label: string;
  options?: { label: string; value: Status }[];
  onValueSelect: (value: Status | null) => void;
  value: Status | null;
}

const labelMap: Record<Status, { label: string }> = {
  OPEN: { label: "Open" },
  CLOSED: { label: "Closed" },
  IN_PROGRESS: { label: "In Progress" },
};

const Dropdown = ({ label, options, onValueSelect, value }: Props) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="soft">
          {value ? labelMap[value].label : label}
          <DropdownMenu.TriggerIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {options?.map((option, index) => (
          <DropdownMenu.Item
            onSelect={() => onValueSelect(option.value)}
            key={index}
          >
            {option.label}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default Dropdown;
