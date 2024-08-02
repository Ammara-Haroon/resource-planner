import { FormEvent, useRef, useState } from "react";
import {
  Resource,
  ResourceData,
} from "../../services/api-responses_interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import ProfilePic from "../../assets/profile_placeholder.jpg";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import PhotoModal from "../PhotoModal/PhotoModal";

interface IProfileModalProps {
  resource: Resource;
  onClose: () => any;
  onSubmit: (data: Required<ResourceData>) => any;
}

const ProfileModal = ({ resource, onClose, onSubmit }: IProfileModalProps) => {
  document.body.style.overflow = "hidden";
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(
    resource.imageUrl || ProfilePic
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    let formData = new FormData(event.currentTarget);
    if (
      (resource.imageUrl || imageUrl !== ProfilePic) &&
      imageUrl !== resource.imageUrl
    ) {
      formData.append("imageFile", selectedFile || new File([], "tmp"));
    }
    const editedProfile: Required<ResourceData> = {
      firstName: "",
      lastName: "",
      ...Object.fromEntries(formData.entries()),
      id: resource.id,
      imageFile: null,
    };
    onSubmit(editedProfile);
  };

  const btnStyleClass =
    "bg-slate-800 text-neutral-200 border border-black px-4 py-1 w-15  hover:text-pink-600";
  const inputStyleClass = "text-lg font-semibold text-center";
  const labelStyleClass = "text-right";
  const handleClose = (): void => {
    document.body.style.overflow = "visible";
    onClose();
  };

  const handleImageChange = () => {
    setShowPhotoModal(true);
  };

  const handlePhotoSave = (imageFile: File | null) => {
    setSelectedFile(imageFile);
    if (imageFile) {
      setImageUrl(URL.createObjectURL(imageFile));
    } else {
      setImageUrl(ProfilePic);
    }
    setShowPhotoModal(false);
  };

  return showPhotoModal ? (
    <PhotoModal
      photoURL={resource.imageUrl}
      onClose={() => {
        setShowPhotoModal(false);
        setSelectedFile(null);
      }}
      onSave={handlePhotoSave}
    />
  ) : (
    <div className="z-50 flex justify-center items-center fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
      <div className="bg-slate-200 p-5 md:m-0 m-2 flex flex-col gap-5 justify-center items-center  border border-black border-dotted">
        <FontAwesomeIcon
          onClick={handleClose}
          className="self-end  hover:text-pink-600 hover:cursor-pointer "
          icon={faTimesCircle}
        />
        <div className=" h-36 w-36 relative p-2">
          <FontAwesomeIcon
            onClick={handleImageChange}
            className="absolute  top-0 right-0   hover:text-pink-600 hover:cursor-pointer "
            icon={faPen}
          />
          <img
            className="object-cover w-full h-full border border-black rounded-full"
            src={imageUrl}
            alt={resource.firstName}
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center flex-col"
        >
          <div
            className="grid grid-cols-2 gap-5"
            style={{ gridTemplateColumns: "1fr 1.5fr" }}
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
          </div>
          <div className="flex justify-center items-center gap-2">
            <button className={btnStyleClass} type="submit">
              Save
            </button>
            <button className={btnStyleClass} onClick={handleClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;
