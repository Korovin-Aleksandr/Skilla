import * as Select from "@radix-ui/react-select";
import "./index.css";
import { useState } from "react";
import { Calendar, ChevronDownIcon } from "@shared/assets/svg/Icon";
import { CustomDatePicker } from "../datepicker-modal";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectListTypeProps {
  options: SelectOption[];
  value: string;
  onValueChange?: (value: string) => void;
  onDateRangeChange?: (dates: { start: Date | null; end: Date | null }) => void;
}

export const SelectData = ({
  options,
  value,
  onValueChange,
  onDateRangeChange,
}: SelectListTypeProps) => {
  // const [value, setValue] = useState("three-days");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState<{
    start: Date | null;
    end: Date | null;
  }>({ start: null, end: null });

  const formatDateToValue = (date: Date | null): string => {
    if (!date) return "";
    return date.toISOString().split("T")[0];
  };

  const generateDateRangeValue = (
    start: Date | null,
    end: Date | null
  ): string => {
    if (!start || !end) return "dates";

    const startStr = formatDateToValue(start);
    const endStr = formatDateToValue(end);

    return `${startStr}:${endStr}`;
  };

  const handleValueChange = (newValue: string) => {
    if (newValue === "dates") {
      setIsDatePickerOpen(true);
      return;
    }

    // setValue(newValue);
    onValueChange?.(newValue);
  };

  const handleDateRangeChange = (dates: {
    start: Date | null;
    end: Date | null;
  }) => {
    setSelectedDates(dates);

    if (dates.start && dates.end) {
      const dateRangeValue = generateDateRangeValue(dates.start, dates.end);
      // setValue(dateRangeValue);
      onValueChange?.(dateRangeValue);
    }

    onDateRangeChange?.(dates);
  };

  const formatDateRangeDisplay = () => {
    if (!selectedDates.start || !selectedDates.end) {
      return "__.__.__ - __.__.__";
    }

    const format = (date: Date) => {
      return date.toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      });
    };

    return `${format(selectedDates.start)} - ${format(selectedDates.end)}`;
  };

  const getDisplayValue = () => {
    if (value.startsWith("custom:")) {
      return formatDateRangeDisplay();
    }
    
    const option = options.find((opt) => opt.value === value);
    return option?.label || "";
  };

  return (
    <>
      <Select.Root value={value} onValueChange={handleValueChange}>
        <Select.Trigger className="Trigger">
          <ChevronDownIcon className="SelectIconLeft" />
          <div className="SelectDate">
            <Calendar className="Calendar" />
            <Select.Value>{getDisplayValue()}</Select.Value>
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
                <Select.Label className="SelectLabel">
                  Указать даты
                </Select.Label>
                <Select.Item className="Item item-data" value="dates">
                  <Select.ItemText className="text-data">
                    {formatDateRangeDisplay()}
                  </Select.ItemText>
                  <Calendar />
                </Select.Item>
              </Select.Group>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>

      <CustomDatePicker
        isOpen={isDatePickerOpen}
        onClose={() => setIsDatePickerOpen(false)}
        onDateChange={handleDateRangeChange}
        initialStartDate={selectedDates.start}
        initialEndDate={selectedDates.end}
      />
    </>
  );
};

export default SelectData;