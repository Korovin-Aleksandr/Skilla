import { SelectData } from "../../../shared/ui/select-date";
import { SelectListType } from "../../../shared/ui/select";
import { CallItem } from "../call-item/call-item";
import "./index.css";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import {
  getCallList,
  
} from "../../../shared/api";
import { getDateRangeParams, type GetCallListParams } from "../../../shared/api/model/hallp";
import { format } from 'date-fns';
import type { CallData } from "../../../shared/api/model/types";

const statusOptions = [
  { value: "all-types", label: "Все типы" },
  { value: "1", label: "Входящие" },
  { value: "0", label: "Исходящие" },
];

const dataOptions = [
  { value: "three-days", label: "3 дня" },
  { value: "month", label: "Месяц" },
  { value: "year", label: "Год" },
];

export const Calls = () => {
  const [selectType, setSelectType] = useState("all-types");
  const [selectData, setSelectData] = useState("three-days");
  const [calls, setCalls] = useState<CallData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCalls = async (typeCall?: string, period?: string) => {
    try {
      setLoading(true);
      setError(null);

      const params: GetCallListParams = {};

      if (typeCall !== "all-types") {
        params.in_out = Number(typeCall);
      }

      if (period && period !== "all-periods") {
        const dateParams = getDateRangeParams(period);
        params.date_start = dateParams.date_start;
        params.date_end = dateParams.date_end;
      }

      const response = await getCallList(params);
      setCalls(response.results);
      console.log(response.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Неизвестная ошибка");
      console.error("Ошибка при загрузке звонков:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCalls(selectType, selectData);
  }, [selectType, selectData]);

  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

const formatDuration = (seconds: number): string => {
  if (seconds === 0) return "0:00";
  
  const date = new Date(seconds * 1000);
  return format(date, 'm:ss');
};

  const handleDataChange = (value: string) => {
    setSelectData(value);
  };

  const handleTypeChange = (value: string) => {
    setSelectType(value);
  };

  return (
    <div className="main">
      <div className="CallList">
        <div className="CallListHeader">
          <SelectListType
            options={statusOptions}
            onValueChange={handleTypeChange}
            value={selectType}
          />
          <SelectData
            options={dataOptions}
            onValueChange={handleDataChange}
            value={selectData}
          />
        </div>

        <ul className="CallListItems">
          <li className="CallListItemsHeader">
            <span>Тип</span>
            <div className="TimeContainer">
              <span>Время</span>
              <ChevronDownIcon />
            </div>
            <span>Сотрудник</span>
            <span>Звонок</span>
            <span>Источник</span>
            <span>Оценка</span>
            <div className="DurationContainer">
              <span className="Duration">Длительность</span>
              <ChevronDownIcon />
            </div>
          </li>
          {loading ? (
            <div className="call-list-state">
              <div className="loading-spinner"></div>
              <p>Загрузка звонков...</p>
            </div>
          ) : (
            <>
              {error ? (
                <div className="call-list-state error">
                  <p>Ошибка загрузки: {error}</p>
                  <button
                    className="retry-button"
                    onClick={() => fetchCalls(selectType, selectData)}
                  >
                    Попробовать снова
                  </button>
                </div>
              ) : calls.length === 0 ? (
                <div className="call-list-state empty">
                  <p>
                    Нет данных о звонках за выбранный период Попробуйте изменить
                    параметры фильтрации
                  </p>
                </div>
              ) : (
                <>
                  {calls.map((call) => (
                    <CallItem
                      key={call.id}
                      typeCall={call.in_out}
                      time={formatTime(call.date)}
                      person={call.person_avatar || null}
                      number={call.from_number}
                      source={call.source || ""}
                      estimation={call.status}
                      duration={formatDuration(call.time)}
                    />
                  ))}
                </>
              )}
            </>
          )}
        </ul>
      </div>
    </div>
  );
};
