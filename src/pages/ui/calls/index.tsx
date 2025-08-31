import { SelectData } from "../../../shared/ui/select-date";
import { SelectListType } from "../../../shared/ui/select";
import { CallItem } from "../call-item/call-item";
import { callList } from "./mok";
import "./index.css";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useState } from "react";

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

export const Calls = () => {
  const [selectType, setSelectType] = useState("all-types");
  const [selectData, setSelectData] = useState("three-days");

  const handleTypeChange = (value: string) => {
    setSelectType(value);
  };

  const handleDataChange = (value: string) => {
    setSelectData(value);
    console.log(value);
  };

  return (
    <div className="main">
      <div className="CallList">
        <div className="CallListHeader">
          <SelectListType
            options={statusOptions}
            onValueChange={handleTypeChange}
            defaultValue={selectType}
          />
          <SelectData
            options={dataOptions}
            onValueChange={handleDataChange}
            defaultValue={selectData}
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
            estimation="great"
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
          <CallItem
            typeCall="incoming"
            time={callList.time}
            person={callList.person}
            number={callList.number}
            source={callList.source}
            estimation={null}
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
            estimation="bad"
            duration={callList.duration}
          />
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
            estimation="bad"
            duration={callList.duration}
          />
          <CallItem
            typeCall="incoming"
            time={callList.time}
            person={callList.person}
            number={callList.number}
            source={callList.source}
            estimation="bad"
            duration={callList.duration}
          />
        </ul>
      </div>
    </div>
  );
};
