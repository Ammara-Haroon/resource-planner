import React from "react";
import { useEffect, useRef, useState } from "react";
import JobForm from "../JobForm/JobForm";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { Job, Resource } from "../../services/api-responses_interfaces";
import { getAvailableResources } from "../../services/resource-sevices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCross, faPen, faTimes } from "@fortawesome/free-solid-svg-icons";
import ProfilePic from "../../assets/profile_placeholder.jpg";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
interface IPhotoModalProps {
  photoURL: string | null;
  onClose: () => any;
  onSave: (imageFile: File | null) => any;
}

const PhotoModal = ({ photoURL, onClose, onSave }: IPhotoModalProps) => {
  document.body.style.overflow = "hidden";
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(photoURL || ProfilePic);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setSelectedFile(null);
      setPreview(ProfilePic);
    }
  };

  const btnStyleClass =
    "bg-slate-800 text-neutral-200 border border-black px-4 py-1 w-15  hover:text-pink-600";
  const inputStyleClass = "text-lg font-semibold text-center";
  const labelStyleClass = "text-right";
  const handleClose = (): void => {
    document.body.style.overflow = "visible";
    onClose();
  };

  return (
    <div className="flex justify-center items-center fixed inset-0 bg-gray-500 z-10 transition-opacity">
      <div className="bg-slate-200 p-5 flex flex-col gap-5 justify-center items-center  border-2 border-slate-900 border-dotted w-fit h-fit">
        <FontAwesomeIcon
          onClick={handleClose}
          className="self-end  hover:text-pink-600 hover:cursor-pointer "
          icon={faTimesCircle}
        />
        <img
          className="h-56 w-56 border border-black rounded-full"
          src={preview}
        />
        <div className="p-2 flex flex-col justify-center">
          <input
            className="w-fit text-lg font-semibold text-center m-2 border border-slate-300"
            name="imageFile"
            id="imageFile"
            type="file"
            onChange={handleFileChange}
          ></input>

          <div
            onClick={() => onSave(selectedFile)}
            className="flex justify-center items-center gap-2 pt-5"
          >
            <button className={btnStyleClass} type="submit">
              Save
            </button>
            <button className={btnStyleClass} onClick={handleClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoModal;
