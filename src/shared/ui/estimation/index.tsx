import type { EstimationType } from "@shared/model/types";
import "./index.css";

export type EestimationProps = {
  type: EstimationType;
};

export const Estimation = ({ type }: EestimationProps) => {
  switch (type) {
    case "Не дозвонился":
      return <button className="BadConteiner">Плохо</button>;
    case "Успешный":
      return <button className="GoodConteiner">Хорошо</button>;
    case "Исчерпывающий":
      return <button className="GreatConteiner">Отлично</button>;
    case "Скрипт не использован":
      return <p className="TextContainer">Скрипт не использован</p>;
    case []:
      return <div></div>;
  }
};
