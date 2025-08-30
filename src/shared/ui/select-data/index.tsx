import * as Select from "@radix-ui/react-select";
import "./select-data.css";
import { useState } from "react";
import { Calendar, ChevronDownIcon } from "../../assets/svg/Icon";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectListTypeProps {
  options: SelectOption[];
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export const SelectData = ({
  options,
  onValueChange,
}: SelectListTypeProps) => {
  const [value, setValue] = useState("three-days");

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    onValueChange?.(newValue);
  };

  return (
    <Select.Root value={value} onValueChange={handleValueChange}>
      <Select.Trigger className="Trigger">
        <ChevronDownIcon className="SelectIconLeft" />
        <div className="SelectDate">
          <Calendar className="Calendar" />
          <Select.Value></Select.Value>
        </div>
        <ChevronDownIcon className="SelectIconRight" />
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position="popper"
          side="bottom"
          sideOffset={12}
          align="start"
        >
          <Select.Viewport className="Viewport">
            <Select.Group className="Group">
              {options.map((option) => (
                <Select.Item
                  className="Item"
                  key={option.value}
                  value={option.value}
                >
                  <Select.ItemText>{option.label}</Select.ItemText>
                </Select.Item>
              ))}
             <Select.Label className="SelectLabel">Указать даты</Select.Label>
             <Select.Item className="Item item-data"  value="dates">
              <Select.ItemText className="text-data">__.__.__ - __.__.__</Select.ItemText> 
              <Calendar />
             </Select.Item>
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};
