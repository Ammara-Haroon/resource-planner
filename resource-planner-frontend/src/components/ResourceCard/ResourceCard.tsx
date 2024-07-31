import React, { useState } from "react";
import {
  Job,
  Resource,
  ResourceData,
} from "../../services/api-responses_interfaces";
import { getAvailableResources } from "../../services/resource-sevices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import Modal from "../JobModal/JobModal";
import ProgressBar from "../ProgressBar/ProgressBar";
import OptionsMenu from "../OptionsMenu/OptionsMenu";
import Profile_Pic from "../../assets/profile_placeholder.jpg";
import WeekView from "../WeekView/WeekView";
import ProfileModal from "../ProfileModal/ProfileModal";
import { useNavigate } from "react-router-dom";
interface IResourceCardProps {
  resource: Resource;
  onDelete: (id: number) => any;
  onEdit: (resource: ResourceData) => any;
}

const ResourceCard = ({ resource, onDelete, onEdit }: IResourceCardProps) => {
  //console.log(job);
  const [showModal, setShowModal] = useState(false);
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const navigate = useNavigate();

  const handleEdit = (): void => {
    setShowOptionsMenu(false);
    setShowModal(true);
  };
  const handleClick = (): void => {
    setShowOptionsMenu(true);
  };
  const handleClose = (): void => {
    setShowOptionsMenu(false);
  };
  const handleCloseModal = (): void => {
    setShowModal(false);
  };
  const handleDelete = (): void => {
    setShowOptionsMenu(false);
    onDelete(resource.id);
  };

  const handleViewMore = () => {
    navigate(`/resources/${resource.id}`, {
      state: { resourceData: resource },
    });
  };

  return (
    <>
      {showModal && (
        <ProfileModal
          resource={resource}
          onClose={handleCloseModal}
          onSubmit={onEdit}
        />
      )}
      <div
        className="p-2 border border-gray-100 grid grid-cols-4 gap-8 bg-neutral-200 hover:bg-slate-300 text-slate-800 text-sm font-semibold"
        style={{ gridTemplateColumns: "1fr 1fr 1fr 45px" }}
      >
        <div className="flex gap-1 items-center">
          <img
            className="h-10 w-10 border rounded-full"
            src={resource.imageUrl || Profile_Pic}
            alt={`${resource.firstName}`}
          />
          <p>{`${resource.firstName} ${resource.lastName}`}</p>
        </div>
        <div className="flex items-center justify-center">
          <p className="text-center">{resource.jobs?.length || 0}</p>
        </div>
        <div className="flex justify-center items-center">
          <WeekView jobs={resource.jobs} />
        </div>
        <div className="flex  hover:cursor-pointer justify-center items-center w-fit relative">
          <FontAwesomeIcon
            onClick={handleClick}
            className="px-5 text-xl"
            icon={faEllipsisV}
          />

          {showOptionsMenu && (
            <OptionsMenu
              options={[
                { label: "Edit", action: handleEdit },
                { label: "Delete", action: handleDelete },
                { label: "More", action: handleViewMore },
              ]}
              onClose={handleClose}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ResourceCard;
