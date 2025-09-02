export const statusOptions = [
  { value: "all-types", label: "Все типы" },
  { value: "1", label: "Входящие" },
  { value: "0", label: "Исходящие" },
];

export const dataOptions = [
  { value: "three-days", label: "3 дня" },
  { value: "month", label: "Месяц" },
  { value: "year", label: "Год" },
];

export type EstimationType =
  | "Не дозвонился"
  | "Успешный"
  | "Исчерпывающий"
  | "Скрипт не использован"
  | [];

export type CallDirection = 1 | 0 | 2 | 3 | null;
