import "./index.css"

export type EstimationType = 'bad' | 'good' | 'great' | 'none-sript'

export type EestimationProps = {
    type: EstimationType
}

export const Estimation = ({ type }: EestimationProps) => {
  switch (type) {
    case 'bad':
      return <button className="BadConteiner">
        Плохо
      </button>;
    case 'good':
      return <button className="GoodConteiner">
        Хорошо
      </button>;
    case 'great':
      return <button className="GreatConteiner">
        Отлично
      </button>;
    case 'none-sript':
      return <p className="TextContainer">
        Скрипт не использован
      </p>;
    default:
      return <button className="BadConteiner">
        Плохо
      </button>
  }
};  