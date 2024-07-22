import React, { useState } from "react";
import { Job } from "../../services/api-responses_interfaces";
import { getAvailableResources } from "../../services/resource-sevices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import Modal from "../JobModal/JobModal";
import ProgressBar from "../ProgressBar/ProgressBar";
import OptionsMenu from "../OptionsMenu/OptionsMenu";
import Profile_Pic from "../../assets/profile_placeholder.jpg";
interface IJobsCardProps {
  job: Job;
  onDelete: (id: number) => any;
  onEdit: (job: Job) => any;
}
const JobsCard = ({ job, onDelete, onEdit }: IJobsCardProps) => {
  //console.log(job);
  const [showModal, setShowModal] = useState(false);
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);

  getAvailableResources(job.startDate, job.endDate);
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
  const handleDelete = (): void => {
    setShowOptionsMenu(false);
    onDelete(job.id);
  };
  return (
    <>
      {showModal && (
        <Modal
          job={job}
          onClose={() => setShowModal(false)}
          onSubmit={onEdit}
        />
      )}
      <div
        className="p-2 border border-gray-100 grid grid-cols-4 gap-8 bg-neutral-200 hover:bg-slate-300 text-slate-800 text-sm font-semibold"
        style={{ gridTemplateColumns: "1fr 1fr 1fr 45px" }}
      >
        <div>
          <h4 className=" font-semibold">{job.name}</h4>
        </div>
        <ProgressBar startDate={job.startDate} endDate={job.endDate} />
        <div>
          {job.resource && typeof job.resource !== "number" ? (
            <div className="flex gap-1 items-center">
              <img
                className="h-10 w-10 border rounded-full"
                src={job.resource.imageUrl || Profile_Pic}
                alt={`${job.resource?.firstName}`}
              />
              <p>{`${job.resource?.firstName} ${job.resource?.lastName}`}</p>
            </div>
          ) : (
            <p className="text-red-700 italic">not assigned</p>
          )}
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
              ]}
              onClose={handleClose}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default JobsCard;
