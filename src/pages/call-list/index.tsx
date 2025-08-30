import { SelectData } from "../../shared/ui/select-data";
import { SelectListType } from "../../shared/ui/select-list-type";
import { CallItem } from "../call-item/call-item";
import { callList } from "../call-list/mok";
import "./index.css";

const statusOptions = [
  { value: "all-types", label: "Все типы" },
  { value: "incoming", label: "Входящие" },
  { value: "outgoing", label: "Исходящие" },
];

export const CallList = () => {
  return (
    <div className="main">
      <div className="CallList">
        <div className="CallListHeader">
          <SelectListType options={statusOptions} />
          <SelectData />
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
            typeCall={callList.typeCall}
            time={callList.time}
            person={callList.person}
            number={callList.number}
            source={callList.source}
            estimation={callList.estimation}
            duration={callList.duration}
          />
          <CallItem
            typeCall={callList.typeCall}
            time={callList.time}
            person={callList.person}
            number={callList.number}
            source={callList.source}
            estimation={callList.estimation}
            duration={callList.duration}
          />
        </ul>
      </div>
    </div>
  );
};
