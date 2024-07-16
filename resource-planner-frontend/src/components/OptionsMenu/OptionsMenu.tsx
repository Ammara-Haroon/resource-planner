import { faClose, faCross } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

// interface IOptionsMenuProps {
//   onEdit: () => any;
//   onClose: () => any;
//   onDelete: () => any;
// }
interface IOptionsMenuProps {
  onClose: () => any;
  options: IOptionProp[];
}
interface IOptionProp {
  label: string;
  action: () => any;
}
const OptionsMenu = ({ options, onClose }: IOptionsMenuProps) => {
  const optionStyleClass = "hover:cursor-pointer hover:bg-slate-300";
  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-0 right-8 py-1 px-2 rounded-md bg-slate-200 z-100"
    >
      <p
        className={`text-xs absolute right-0 px-1 ${optionStyleClass}`}
        onClick={onClose}
      >
        <FontAwesomeIcon icon={faClose} />
      </p>
      {options.map((option) => (
        <p className={optionStyleClass} onClick={option.action}>
          {option.label}
        </p>
      ))}
    </div>
  );
};
// const OptionsMenu = ({ onClose, onEdit, onDelete }: IOptionsMenuProps) => {
//   const optionStyleClass = "hover:cursor-pointer hover:bg-slate-300";
//   return (
//     <div
//       onMouseLeave={onClose}
//       className="absolute top-0 right-8 py-1 px-2 rounded-md bg-slate-200 z-100"
//     >
//       <p
//         className={`text-xs absolute right-0 px-1 ${optionStyleClass}`}
//         onClick={onClose}
//       >
//         <FontAwesomeIcon icon={faClose} />
//       </p>
//       <p className={optionStyleClass} onClick={onEdit}>
//         Edit
//       </p>
//       <p onClick={onDelete} className={optionStyleClass}>
//         Delete
//       </p>
//     </div>
//   );
// };

export default OptionsMenu;
