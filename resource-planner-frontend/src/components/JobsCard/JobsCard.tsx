import React, { useState } from "react";
import { Job } from "../../services/api-responses_interfaces";
import { getAvailableResources } from "../../services/resource-sevices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import Modal from "../Modal/Modal";
import ProgressBar from "../ProgressBar/ProgressBar";
import OptionsMenu from "../OptionsMenu/OptionsMenu";

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
        className="p-2 border border-gray-100 grid grid-cols-4 gap-8 hover:bg-slate-500"
        style={{ gridTemplateColumns: "1fr 1fr 1fr 45px" }}
      >
        <div className="hover:bg-slate-500 after:hover:bg-slate-500">
          <h4 className="text-lg font-semibold">{job.name}</h4>
        </div>
        <ProgressBar startDate={job.startDate} endDate={job.endDate} />
        <div>
          {job.resource ? (
            <p>{`${job.resource?.firstName} ${job.resource?.lastName}`}</p>
          ) : (
            <p className="text-red-700">not assigned</p>
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
              onDelete={handleDelete}
              onEdit={handleEdit}
              onClose={handleClose}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default JobsCard;
