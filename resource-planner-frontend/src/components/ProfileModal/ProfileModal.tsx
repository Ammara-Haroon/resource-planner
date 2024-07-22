import React from "react";
import { useEffect, useRef, useState } from "react";
import JobForm from "../JobForm/JobForm";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { Job, Resource } from "../../services/api-responses_interfaces";
import { getAvailableResources } from "../../services/resource-sevices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCross, faTimes } from "@fortawesome/free-solid-svg-icons";
import ProfilePic from "../../assets/profile_placeholder.jpg";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
interface IProfileModalProps {
  resource: Resource;
  onClose: () => any;
  onSubmit: (data: Resource) => any;
}

const ProfileModal = ({ resource, onClose, onSubmit }: IProfileModalProps) => {
  document.body.style.overflow = "hidden";
  const formRef = useRef<HTMLFormElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(resource.imageUrl);
  const handlSubmit = (event: any): void => {
    //event.preventDefault();
    const formData =
      Object.fromEntries(new FormData(formRef.current).entries()) || null;
    const editedProfile: Resource = { ...resource, ...formData };
    if (editedProfile.imageUrl.length === 0) editedProfile.imageUrl = null;
    console.log(editedProfile);
    onSubmit(editedProfile);
  };

  const handlePreview = (
    event: MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    event.preventDefault();
    let newUrl: string | null =
      new FormData(formRef.current).get("imageUrl").toString() || null;
    newUrl = newUrl?.length > 0 ? newUrl : null;
    setImageUrl(newUrl);
  };
  const btnStyleClass = "border border-black px-4 py-1 w-15 hover:bg-slate-500";
  const inputStyleClass = "text-lg font-semibold text-center";
  const labelStyleClass = "text-right";
  const handleClose = (): void => {
    document.body.style.overflow = "visible";
    onClose();
  };

  return (
    <div className="flex justify-center items-center fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
      <div className="bg-slate-200 p-5 flex flex-col gap-5 justify-center items-center  border border-black border-dotted">
        <FontAwesomeIcon
          onClick={handleClose}
          className="self-end hover:text-slate-400 hover:cursor-pointer"
          icon={faTimesCircle}
        />
        <div className="m-5 border h-28 w-28  rounded-full ">
          <img
            className="object-cover w-full h-full border border-black rounded-full"
            src={imageUrl || ProfilePic}
            alt={resource.firstName}
          />
        </div>
        <form
          onSubmit={handlSubmit}
          className="flex justify-center items-center"
          ref={formRef}
        >
          <div className="flex flex-col gap-5">
            <div
              className="grid grid-cols-2 gap-5"
              style={{ gridTemplateColumns: "1fr 1.5fr 1fr" }}
            >
              <label className={labelStyleClass} htmlFor="firstName">
                First Name:
              </label>
              <input
                className={inputStyleClass}
                defaultValue={resource.firstName}
                name="firstName"
                id="firstName"
                required
              ></input>
              <p></p>
              <label className={labelStyleClass} htmlFor="lastName">
                Last Name:
              </label>
              <input
                className="text-lg font-semibold text-center"
                defaultValue={resource.lastName}
                name="lastName"
                id="lastName"
                required
              ></input>
              <p></p>

              <label className={labelStyleClass} htmlFor="imageUrl">
                Image URL:
              </label>
              <input
                className="w-fit text-lg font-semibold text-center"
                defaultValue={imageUrl || ""}
                placeholder="None"
                name="imageUrl"
                id="imageUrl"
              ></input>
              <button className="font-bold underline" onClick={handlePreview}>
                Preview
              </button>
            </div>
            <div className="flex justify-center items-center gap-2">
              <button className={btnStyleClass} type="submit">
                Save
              </button>
              <button className={btnStyleClass} onClick={handleClose}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;
