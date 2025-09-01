export interface CallData {
  id: string;
  in_out: 1 | 0 | 2 | 3 | null;
  date: string;
  person_avatar: string | null;
  person_name: string;
  person_surname: string;
  from_number: string;
  source: string;
  status:
    | "Не дозвонился"
    | "Успешный"
    | "Исчерпывающий"
    | "Скрипт не использован"
    | [];
  time: number;
  record?: string;
  partnership_id?: string;
}

export interface ApiResponse {
  total_rows: number;
  results: CallData[];
}

export const API_CONFIG = {
  URL: "https://api.skilla.ru/mango/getList",
  TOKEN: "testtoken",
};

export interface GetCallListParams {
  date_start?: string;
  date_end?: string;
  in_out?: number;
}