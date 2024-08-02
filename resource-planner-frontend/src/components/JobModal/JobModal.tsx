import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import JobForm from "../JobForm/JobForm";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import {
  Job,
  JobData,
  Resource,
} from "../../services/api-responses_interfaces";
import {
  getAllResources,
  getAvailableResources,
} from "../../services/resource-sevices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import ComboBox, { IComboBoxOption } from "../ComboBox/ComboBox";
import { faX } from "@fortawesome/free-solid-svg-icons";

interface IModalProps {
  job: Job;
  onClose: () => any;
  onSubmit: (data: Required<JobData>) => any;
}
const JobModal = ({ job, onClose, onSubmit }: IModalProps) => {
  const [selectedResource, setSelectedResource] = useState(
    (job.resource && job.resource.id) || -1
  );
  const jobNameRef = useRef<HTMLInputElement>(null);
  const [dateRange, setDateRange] = useState<DateValueType>({
    startDate: job.startDate,
    endDate: job.endDate,
  });
  const [resources, setResources] = useState<Resource[]>([]);
  const btnStyleClass =
    "border border-black px-4 py-1 w-15 bg-slate-800 text-neutral-200  hover:text-pink-600";
  const inputStyleClass = "text-lg font-semibold text-center";
  const labelStyleClass = "text-right p-1";

  document.body.style.overflow = "hidden";

  useEffect(() => {
    if (dateRange && dateRange.startDate && dateRange.endDate) {
      getAvailableResources(
        new Date(dateRange.startDate),
        new Date(dateRange.endDate)
      ).then((data) => {
        data.push();
        setResources(data);
      });
    } else {
      getAllResources().then((data) => setResources(data));
    }
  }, [dateRange]);

  const handleDateRangeChange = (newValue: DateValueType) => {
    if (newValue && newValue.startDate && newValue.endDate) {
      setDateRange(newValue);
    } else {
      setDateRange({ startDate: new Date(), endDate: new Date() });
    }
  };

  const handleSubmit = (event: any): void => {
    //event.preventDefault();
    if (!dateRange || !dateRange.startDate || !dateRange.endDate) return;
    const newJob: Required<JobData> = {
      id: job.id,
      name: jobNameRef.current?.value || "",
      startDate: new Date(dateRange.startDate),
      endDate: new Date(dateRange.endDate),
      resource: selectedResource == -1 ? null : selectedResource,
    };
    onSubmit(newJob);
  };

  const options = new Array<IComboBoxOption>();
  options.push({ label: "Not Assigned", icon: faX, value: -1 });
  resources.forEach((res) =>
    options.push({
      label: `${res.firstName} ${res.lastName}`,
      iconSrc: res.imageUrl,
      value: res.id,
    })
  );
  if (job.resource && job.resource.id) {
    options.push({
      label: `*${job.resource.firstName} ${job.resource.lastName}*`,
      iconSrc: job.resource.imageUrl,
      value: job.resource.id,
    });
  }

  const handleClose = (): void => {
    document.body.style.overflow = "visible";
    onClose();
  };
  return (
    <div className="flex justify-center items-center fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-20">
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center"
      >
        <div className="bg-slate-200 p-5 flex flex-col gap-10 justify-center items-center  border border-black border-dotted">
          <FontAwesomeIcon
            onClick={handleClose}
            className="self-end  hover:text-pink-600 hover:cursor-pointer"
            icon={faTimesCircle}
          />

          <div
            className="grid grid-cols-2 gap-5"
            style={{ gridTemplateColumns: "1fr 2fr" }}
          >
            <label className={labelStyleClass} htmlFor="name">
              Job:
            </label>
            <input
              className={inputStyleClass}
              defaultValue={job.name}
              name="name"
              id="name"
              ref={jobNameRef}
              required
            ></input>
            <label className={labelStyleClass} htmlFor="name">
              Expected Timeline:
            </label>
            <Datepicker value={dateRange} onChange={handleDateRangeChange} />
            <label className={labelStyleClass} htmlFor="name">
              Assigned To:
            </label>
            <ComboBox
              options={options}
              defaultValue={
                job.resource
                  ? `${job.resource?.firstName} ${job.resource?.lastName}`
                  : "Not Assigned"
              }
              name="resource"
              id="resource"
              opensUp={true}
              onSelect={(event: any) => {
                setSelectedResource(event.target.value);
              }}
            />
          </div>

          <div className="flex justify-center items-center gap-2">
            <button className={btnStyleClass} type="submit">
              Save
            </button>
            <button className={btnStyleClass} onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default JobModal;
