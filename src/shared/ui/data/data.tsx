import { useState } from "react";
import DatePicker from "react-datepicker";
import { Calendar } from "../../assets/svg/Icon";
import { ru } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";

interface CustomDatePickerProps {
  onDateChange?: (dates: { start: Date | null; end: Date | null }) => void;
}

export const CustomDatePicker = ({ onDateChange }: CustomDatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    // Если обе даты выбраны, автоматически применяем
    if (start && end) {
      onDateChange?.({ start, end });
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    setStartDate(null);
    setEndDate(null);
    onDateChange?.({ start: null, end: null });
    setIsOpen(false);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  const displayText =
    startDate && endDate
      ? `${formatDate(startDate)} - ${formatDate(endDate)}`
      : "";

  return (
    <div className="DatePickerContainer">
      <button
        className="DatePickerTrigger"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span className="DateText">{displayText}</span>
         <div className="UnderlineGrid">
            {/* 12 черточек для формата: DD.DD.DD - DD.DD.DD */}
            {Array.from({ length: 13 }, (_, index) => (
              <div key={index} className="UnderlineSegment"></div>
            ))}
          </div>
        <Calendar className="CalendarIcon" />
      </button>

      {isOpen && (
        <div className="DatePickerDropdown">
          <div className="CalendarContainer">
            {/* Календарь с выбором интервала */}
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

            <div className="CalendarActions">
              <button onClick={handleClear} className="ClearButton">
                Очистить
              </button>
              <button onClick={() => setIsOpen(false)} className="CancelButton">
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
