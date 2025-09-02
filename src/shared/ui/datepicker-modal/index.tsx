import { useState } from "react";
import DatePicker from "react-datepicker";
import { ru } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";

interface CustomDatePickerProps {
  isOpen: boolean;
  onClose: () => void;
  onDateChange?: (dates: { start: Date | null; end: Date | null }) => void;
  initialStartDate?: Date | null;
  initialEndDate?: Date | null;
}

export const CustomDatePicker = ({
  isOpen,
  onClose,
  onDateChange,
  initialStartDate = null,
  initialEndDate = null,
}: CustomDatePickerProps) => {
  const [startDate, setStartDate] = useState<Date | null>(initialStartDate);
  const [endDate, setEndDate] = useState<Date | null>(initialEndDate);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleApply = () => {
    onDateChange?.({ start: startDate, end: endDate });
    onClose();
  };

  const handleClear = () => {
    setStartDate(null);
    setEndDate(null);
    onDateChange?.({ start: null, end: null });
    onClose();
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  const displayText = `${formatDate(startDate)} - ${formatDate(endDate)}`;

  if (!isOpen) return null;

  return (
    <div className="DatePickerModalOverlay" onClick={onClose}>
      <div className="DatePickerModal" onClick={(e) => e.stopPropagation()}>
        <div className="DatePickerHeader">
          <span className="SelectedDatesPreview">{displayText}</span>
          <button className="CloseButton" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="CalendarContainer">
          <DatePicker
            selectsRange
            startDate={startDate}
            endDate={endDate}
            onChange={handleDateChange}
            locale={ru}
            dateFormat="dd.MM.yy"
            inline
            monthsShown={1}
            className="RangeCalendar"
          />
        </div>

        <div className="ModalActions">
          <button onClick={handleClear} className="ClearButton">
            Очистить
          </button>
          <button onClick={handleApply} className="ApplyButton">
            Применить
          </button>
        </div>
      </div>
    </div>
  );
};