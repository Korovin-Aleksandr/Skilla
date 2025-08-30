import * as Select from "@radix-ui/react-select";
import "./index.css";
import { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon} from "../../assets/svg/Icon";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectListTypeProps {
  options: SelectOption[];
  defaultValue?: string;
  placeholder?: string;
  onValueChange?: (value: string) => void;
}

export const SelectListType = ({ 
  options = [
    { value: "all-types", label: "Все типы" },
    { value: "incoming", label: "Входящие" },
    { value: "outgoing", label: "Исходящие" }
  ],
  defaultValue = "all-types",
  placeholder = "Выберите значение",
  onValueChange 
}: SelectListTypeProps) => {
  const [value, setValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    onValueChange?.(newValue);
  };

  const selectedOption = options.find(option => option.value === value);

  return (
     <Select.Root value={value} onValueChange={handleValueChange} onOpenChange={setIsOpen}>
      <Select.Trigger className="SelectTrigger">
        <Select.Value aria-label={selectedOption?.label || placeholder}>
          {selectedOption?.label || placeholder}
        </Select.Value>
         <Select.Icon className="SelectIcon">
          {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          side="bottom"
          sideOffset={12}
          align="start"
        >
          <Select.ScrollUpButton className="SelectScrollButton">
          </Select.ScrollUpButton>
          <Select.Viewport className="SelectViewport">
            <Select.Group className="SelectGroup">
              {options.map((option) => (
                <Select.Item 
                  key={option.value} 
                  className="SelectItem" 
                  value={option.value}
                >
                  <Select.ItemText>{option.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};