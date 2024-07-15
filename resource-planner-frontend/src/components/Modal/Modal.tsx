import React, { useEffect, useRef, useState } from "react";
import JobForm from "../JobForm/JobForm";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { Job, Resource } from "../../services/api-responses_interfaces";
import { getAvailableResources } from "../../services/resource-sevices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCross, faTimes } from "@fortawesome/free-solid-svg-icons";

interface IModalProps {
  job: Job;
  onClose: () => any;
  onSubmit: (data: Job) => any;
}
const Modal = ({ job, onClose, onSubmit }: IModalProps) => {
  const [options, setOptions] = useState<Resource[]>([]);
  document.body.style.overflow = "hidden";
  useEffect(() => {
    getAvailableResources(job.startDate, job.endDate).then((data) =>
      setOptions(data)
    );
  }, []);

  const formRef = useRef<HTMLFormElement | null>(null);
  const [value, setValue] = useState<DateValueType>({
    startDate: job.startDate,
    endDate: job.endDate,
  });
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
    event.preventDefault();
    const formData =
      Object.fromEntries(new FormData(formRef.current).entries()) || null;
    console.log(formData);
    const editedJob: Job = { ...job, ...formData };
    editedJob.startDate = value?.startDate;
    editedJob.endDate = value?.endDate;

    console.log(editedJob);
    onSubmit(editedJob);
  };

  return (
    <div className="flex justify-center items-center fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
      <div className="w-11/12 h-2/3 bg-slate-50 flex justify-center items-center">
        <form
          onSubmit={handlSubmit}
          className="flex justify-center items-center"
          ref={formRef}
        >
          <div className="relative flex flex-col gap-5 justify-center items-center">
            <input
              className="text-lg font-semibold text-center"
              defaultValue={job.name}
              name="name"
              required
            ></input>
            <div>
              <Datepicker value={value} onChange={handleValueChange} />
            </div>
            <select name="resource" defaultValue={job.resource?.id}>
              {options.map((op: Resource) => (
                <option key={op.id} value={op.id}>
                  {op.firstName} {op.lastName}
                </option>
              ))}
            </select>
            <button type="submit">Save</button>
            <p className="absolute top-0 right-0">
              <FontAwesomeIcon
                onClick={() => {
                  document.body.style.overflow = "visible";
                  onClose();
                }}
                icon={faTimes}
              />
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
