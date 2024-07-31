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

interface IModalProps {
  job: Job;
  onClose: () => any;
  onSubmit: (data: JobData) => any;
}
const JobModal = ({ job, onClose, onSubmit }: IModalProps) => {
  const [options, setOptions] = useState<Resource[]>([]);
  const [resourceId, setResourceId] = useState(
    (job.resource && job.resource.id) || -1
  );
  const formRef = useRef<HTMLFormElement | null>(null);
  const [value, setValue] = useState<DateValueType>({
    startDate: job.startDate,
    endDate: job.endDate,
  });
  console.log(job);
  document.body.style.overflow = "hidden";

  useEffect(() => {
    if (value) {
      getAvailableResources(value.startDate, value.endDate).then((data) => {
        if (job.resource) {
          data.push(job.resource);
        }
        setOptions(data);
      });
    } else {
      getAllResources().then((data) => setOptions(data));
    }
  }, []);

  const handleValueChange = (newValue: any) => {
    newValue.startDate = new Date(newValue.startDate);
    newValue.endDate = new Date(newValue.endDate);

    console.log("newValue:", newValue);
    setValue(newValue);
    getAvailableResources(newValue.startDate, newValue.endDate).then((data) =>
      setOptions(data)
    );
  };

  const handlSubmit = (event: any): void => {
    //event.preventDefault();
    const formData =
      Object.fromEntries(new FormData(formRef.current).entries()) || null;
    console.log(formData);
    const editedJob: Job = { ...job, ...formData };
    editedJob.startDate = value?.startDate;
    editedJob.endDate = value?.endDate;
    editedJob.resource = Number(formData.resource);
    if (editedJob.resource === -1) editedJob.resource = null;
    console.log(editedJob);
    onSubmit(editedJob);
  };
  const handleChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    setResourceId(event.target.value);
  };

  const btnStyleClass =
    "border border-black px-4 py-1 w-15 bg-slate-800 text-neutral-200  hover:text-pink-600";
  const inputStyleClass = "text-lg font-semibold text-center";
  const labelStyleClass = "text-right p-1";
  const handleClose = (): void => {
    document.body.style.overflow = "visible";
    onClose();
  };
  return (
    <div className="flex justify-center items-center fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
      <form
        onSubmit={handlSubmit}
        className="flex justify-center items-center"
        ref={formRef}
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
              required
            ></input>
            <label className={labelStyleClass} htmlFor="name">
              Expected Timeline:
            </label>
            <Datepicker value={value} onChange={handleValueChange} />
            <label className={labelStyleClass} htmlFor="name">
              Assigned To:
            </label>
            <select
              className={inputStyleClass}
              onChange={handleChange}
              name="resource"
              id="resource"
              value={resourceId}
            >
              <option key={-1} value={-1}>
                Not Assigned
              </option>
              {options.map((op: Resource) => (
                <option key={op.id} value={op.id}>
                  {op.firstName} {op.lastName}
                </option>
              ))}
            </select>
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
