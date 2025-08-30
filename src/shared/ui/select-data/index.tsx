import * as Select from "@radix-ui/react-select";
import "./select-data.css";
import { useState } from "react";
import { Calendar, ChevronDownIcon } from "../../assets/svg/Icon";

interface SelectListTypeProps {
  onValueChange?: (value: string) => void;
  onDateChange?: (dates: { start: Date | null; end: Date | null }) => void;
}

export const SelectData = ({ onValueChange}: SelectListTypeProps) => {
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
          <Calendar />
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
          <Select.ScrollUpButton></Select.ScrollUpButton>
          <Select.Viewport className="Viewport">
            <Select.Group className="Group">
              <Select.Item className="Item" value="three-days">
                <Select.ItemText>3 дня</Select.ItemText>
              </Select.Item>
              <Select.Item className="Item" value="month">
                <Select.ItemText>Месяц</Select.ItemText>
              </Select.Item>
              <Select.Item className="Item" value="year">
                <Select.ItemText>Год</Select.ItemText>
              </Select.Item>
            </Select.Group>
            <Select.Group>
              <Select.Label className="SelectLabel">Указать даты</Select.Label>
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};
