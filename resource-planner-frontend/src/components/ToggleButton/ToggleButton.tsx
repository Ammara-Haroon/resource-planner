import {
  faChartGantt,
  faTableCells,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

interface IToggleButtonProps {
  onSwitch: () => any;
  values: string[];
  icons: IconDefinition[];
  defaultValue: number;
}
const ToggelButton = ({
  onSwitch,
  values,
  icons,
  defaultValue = 0,
}: IToggleButtonProps) => {
  const [currentValue, setCurrentValue] = useState(defaultValue);
  const switchStyle =
    "text-neutral-100 w-20 border-2 shadow-sm border-pink-500 rounded-full flex relative m-2 items-center  cursor-pointer";
  let switchButtonStyle =
    "bg-slate-900 z-5 p-1 transition-all rounded-full text-neutral-200 w-fit border-2 text-pink-500 border-pink-500 shadow-pink-500 shadow-sm shadow-gray-500";

  switchButtonStyle =
    currentValue === 0
      ? `${switchButtonStyle}`
      : `${switchButtonStyle} translate-x-[calc(50px)]`;

  let tagStyle = "w-full p-1 px-2 absolute text-gray-500";
  tagStyle =
    currentValue === 0 ? `${tagStyle} text-right` : `${tagStyle} text-left`;

  const handleClick = () => {
    setCurrentValue((currentValue + 1) % 2);
    onSwitch();
  };
  return (
    <div onClick={handleClick} className={switchStyle}>
      <button className={switchButtonStyle}>
        <FontAwesomeIcon icon={icons[(currentValue + 1) % 2]} />
      </button>
      <p className={tagStyle}>{values[currentValue]}</p>
    </div>
  );
};

export default ToggelButton;
