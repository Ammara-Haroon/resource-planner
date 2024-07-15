import React, { useState } from "react";
import { Job } from "../../services/api-responses_interfaces";
import { getAvailableResources } from "../../services/resource-sevices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import Modal from "../Modal/Modal";

const JobsCard = ({ job }: { job: Job }) => {
  console.log(job);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const progress =
    Math.max(
      (new Date().getTime() - job.startDate.getTime()) /
        (job.endDate.getTime() - job.startDate.getTime()),
      0
    ) * 100;
  console.log(progress);
  console.log(isModalVisible);

  getAvailableResources(job.startDate, job.endDate);
  const handleClick = (): void => {
    setIsModalVisible(true);
  };

  return (
    <>
      {isModalVisible && (
        <Modal job={job} onClose={() => setIsModalVisible(false)} />
      )}
      <div
        className="p-2 grid grid-cols-4 divide-y-2 gap-2 hover:bg-slate-500  hover:cursor-pointer"
        onClick={handleClick}
      >
        <div className="hover:bg-slate-500 after:hover:bg-slate-500">
          <h4 className="text-lg font-semibold">{job.name}</h4>
        </div>

        <div className="hover:bg-slate-500">
          <div className="flex justify-between">
            <span>
              {job.startDate.getDate()}/{job.startDate.getMonth() + 1}
            </span>
            <span>
              {job.endDate.getDate()}/{job.endDate.getMonth() + 1}
            </span>
          </div>
          <div className="border-4 rounded-xl border-slate-700 w-full h-5 bg-gray-400">
            {progress !== 0 && (
              <div
                className="border-4 rounded-xl border-transparent w-full h-full bg-green-900"
                style={{ width: `${progress}%` }}
              ></div>
            )}
          </div>
        </div>
        <div className="text-red-700">
          {job.resource ? (
            `${job.resource?.firstName} ${job.resource?.lastName}`
          ) : (
            <select>
              <option>not assigned</option>
            </select>
          )}
        </div>
        <FontAwesomeIcon icon={faMinus} />
      </div>
    </>
  );
};

export default JobsCard;
