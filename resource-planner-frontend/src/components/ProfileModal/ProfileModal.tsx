import React from "react";
import { useEffect, useRef, useState } from "react";
import JobForm from "../JobForm/JobForm";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { Job, Resource } from "../../services/api-responses_interfaces";
import { getAvailableResources } from "../../services/resource-sevices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCross, faTimes } from "@fortawesome/free-solid-svg-icons";
import ProfilePic from "../../assets/profile_placeholder.jpg";
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
    event.preventDefault();
    const formData =
      Object.fromEntries(new FormData(formRef.current).entries()) || null;
    const editedProfile: Resource = { ...resource, ...formData };
    if (editedProfile.imageUrl.length === 0) editedProfile.imageUrl = null;
    console.log(editedProfile);
    onSubmit(editedProfile);
  };

  const handlePreview = (): void => {
    let newUrl: string | null =
      new FormData(formRef.current).get("imageUrl").toString() || null;
    newUrl = newUrl?.length > 0 ? newUrl : null;
    setImageUrl(newUrl);
  };

  return (
    <div className="flex justify-center items-center fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
      <div className="w-11/12 h-2/3 bg-slate-50 flex flex-col justify-center items-center">
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
          <p className="absolute top-0 right-0">
            <FontAwesomeIcon
              onClick={() => {
                document.body.style.overflow = "visible";
                onClose();
              }}
              icon={faTimes}
            />
          </p>

          <div className="relative flex flex-col gap-5 justify-center items-center">
            <div>
              <label htmlFor="firstName">First Name:</label>
              <input
                className="text-lg font-semibold text-center"
                defaultValue={resource.firstName}
                name="firstName"
                id="firstName"
                required
              ></input>
            </div>
            <div>
              <label htmlFor="lastName">Last Name:</label>
              <input
                className="text-lg font-semibold text-center"
                defaultValue={resource.lastName}
                name="lastName"
                id="lastName"
                required
              ></input>
            </div>
            <div>
              <label htmlFor="imageUrl">Image URL:</label>
              <input
                className="w-fit text-lg font-semibold text-center"
                defaultValue={imageUrl || ""}
                placeholder="None"
                name="imageUrl"
                id="imageUrl"
              ></input>
              <button onClick={handlePreview}>Preview</button>
            </div>
            <div className="flex gap-2">
              <button type="submit">Save</button>
              <button onClick={onClose}>Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;
