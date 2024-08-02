import { faAngleDown, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import ProfilePic from "../../assets/profile_placeholder.jpg";

export interface IComboBoxOption {
  label: string;
  iconSrc?: string | null;
  icon?: IconDefinition;
  value: string | number;
}
interface IComboBoxProps {
  options: IComboBoxOption[];
  defaultValue: string | number;
  name: string;
  id: string;
  opensUp: boolean;
  onSelect: (event: any) => any;
}

const ComboBox = ({
  options,
  defaultValue,
  name,
  id,
  opensUp,
  onSelect,
}: IComboBoxProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const imgStyleClass = "h-7 w-7 rounded-full p-1";
  const iconStyleClass = "h-5 w-5 rounded-full p-1";
  const optionsBoxStyle = `grid grid-col-2 shadow-2xl absolute rounded-md bg-neutral-200 z-50 w-full border border-slate-500 min-w-fit max-h-[calc(50lvh)] overflow-y-scroll ${
    opensUp ? "bottom-11" : "top-11"
  }`;
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  return (
    <div className="relative text-slate-900">
      <div
        className="bg-transparent z-6 w-full h-full absolute hover:cursor-pointer"
        onClick={() => setShowOptions(!showOptions)}
      ></div>
      <div className="hover:cursor-pointer flex justify-center items-center rounded-md overflow-hidden  w-full h-9">
        <input
          className="px-2 w-full bg-slate-100 h-9"
          name={name}
          id={id}
          disabled
          value={selectedValue}
        />
        <FontAwesomeIcon
          className="bg-slate-100 py-3 p-1 "
          icon={faAngleDown}
        />
      </div>
      {showOptions && (
        <div
          className={optionsBoxStyle}
          onMouseLeave={() => setShowOptions(false)}
        >
          {options.map((op: IComboBoxOption) => (
            <div
              key={op.value}
              onClick={() => {
                setShowOptions(false);
                setSelectedValue(op.label);
                onSelect({ target: { id: id, value: op.value } });
              }}
              className="flex items-center gap-1 hover:bg-slate-400 cursor-pointer"
            >
              {op.icon ? (
                <FontAwesomeIcon className={iconStyleClass} icon={op.icon} />
              ) : (
                <img
                  className={imgStyleClass}
                  src={op.iconSrc || ProfilePic}
                  alt={op.label}
                />
              )}
              <span>{op.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComboBox;
