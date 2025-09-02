import { SelectListType, SelectData } from "@/shared";
import "./index.css";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { dataOptions, statusOptions } from "@shared/model/types";
import { CallItem } from "../call-item";
import { useCalls } from "@shared/hooks";
import { formatDuration, formatTime } from "@shared/lib/format";

export const Calls = () => {
  const [selectType, setSelectType] = useState("all-types");
  const [selectData, setSelectData] = useState("three-days");

  const { calls, loading, error, fetchCalls } = useCalls(
    selectType,
    selectData
  );

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
                <div className="call-list-state">
                  <p>Ошибка загрузки: {error}</p>
                  <button
                    className="retry-button"
                    onClick={() => fetchCalls(selectType, selectData)}
                  >
                    Попробовать снова
                  </button>
                </div>
              ) : calls.length === 0 ? (
                <div className="call-list-state">
                  <p>
                    Нет данных о звонках за выбранный период. Попробуйте
                    изменить параметры фильтрации
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
                      record={call.record}
                      partnership_id={call.partnership_id}
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
