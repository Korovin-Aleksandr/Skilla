import type { CallDirection, EstimationType } from "@shared/model/types";

export interface CallData {
  id: string;
  in_out: CallDirection;
  date: string;
  person_avatar: string | null;
  person_name: string;
  person_surname: string;
  from_number: string;
  source: string;
  status: EstimationType;
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

export const API_CONFIG_DEV = {
  URL: "https://api.skilla.ru/mango",
  TOKEN: "testtoken",
};

export interface GetCallListParams {
  date_start?: string;
  date_end?: string;
  in_out?: number;
}