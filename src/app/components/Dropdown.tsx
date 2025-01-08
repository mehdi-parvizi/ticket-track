import { Status } from "@prisma/client";
import { Button, DropdownMenu } from "@radix-ui/themes";

interface Props {
  lable: string;
  options?: { lable: string; value: Status }[];
  onValueSelect: (value: Status | null) => void;
  value: Status | null;
}

const valueMap: Record<
  Status,
  { lable: string; color: "red" | "violet" | "green" }
> = {
  OPEN: { lable: "Open", color: "red" },
  CLOSED: { lable: "Closed", color: "green" },
  IN_PROGRESS: { lable: "In Progress", color: "violet" },
};

const Dropdown = ({ lable, options, onValueSelect, value }: Props) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="soft" color={value ? valueMap[value].color : "violet"}>
          {value ? valueMap[value].lable : lable}
          <DropdownMenu.TriggerIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {options?.map((option, index) => (
          <DropdownMenu.Item
            onSelect={() => onValueSelect(option.value)}
            key={index}
            color={valueMap[option.value].color}
          >
            {option.lable}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default Dropdown;
