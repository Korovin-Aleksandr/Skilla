import { SelectData } from "../../shared/ui/select-data";
import { SelectListType } from "../../shared/ui/select-list-type";
import { CallItem } from "../../entities/call-item/call-item";
import { callList } from "../call-list/mok";
import "./index.css";

const statusOptions = [
  { value: "all-types", label: "Все типы" },
  { value: "incoming", label: "Входящие" },
  { value: "outgoing", label: "Исходящие" },
];

const dataOptions = [
  { value: "three-days", label: "3 дня" },
  { value: "month", label: "Месяц" },
  { value: "year", label: "Год" },
];

export const CallList = () => {
  return (
    <div className="main">
      <div className="CallList">
        <div className="CallListHeader">
          <SelectListType options={statusOptions} />
          <SelectData options={dataOptions} />
        </div>

        <ul className="CallListItems">
          <li className="CallListItemsHeader">
            <span>Тип</span>
            <span>Время</span>
            <span>Сотрудник</span>
            <span>Звонок</span>
            <span>Источник</span>
            <span>Оценка</span>
            <span>Длительность</span>
          </li>
          <CallItem
            typeCall="incoming"
            time={callList.time}
            person={callList.person}
            number={callList.number}
            source={callList.source}
            estimation="bad"
            duration={callList.duration}
          />
          <CallItem
            typeCall="incoming"
            time={callList.time}
            person={callList.person}
            number={callList.number}
            source={callList.source}
            estimation="good"
            duration={callList.duration}
          />
          <CallItem
            typeCall="incoming"
            time={callList.time}
            person={callList.person}
            number={callList.number}
            source={callList.source}
            estimation="great"
            duration={callList.duration}
          />
            <CallItem
            typeCall="incoming"
            time={callList.time}
            person={callList.person}
            number={callList.number}
            source={callList.source}
            estimation="none-sript"
            duration={callList.duration}
          />
        </ul>
      </div>
    </div>
  );
};
