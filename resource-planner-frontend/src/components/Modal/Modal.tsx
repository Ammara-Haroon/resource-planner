import React, { useEffect, useRef, useState } from "react";
import JobForm from "../JobForm/JobForm";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { Job, Resource } from "../../services/api-responses_interfaces";
import { getAvailableResources } from "../../services/resource-sevices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCross, faTimes } from "@fortawesome/free-solid-svg-icons";

const Modal = ({ job, onClose }: { job: Job; onClose: () => void }) => {
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

  return (
    <div className="flex justify-center items-center fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
      <div className="w-11/12 h-2/3 bg-slate-50">
        <form className="flex justify-center" ref={formRef}>
          <div>
            <input
              className="text-lg font-semibold"
              defaultValue={job.name}
              name="name"
              required
            ></input>
            <div>
              <Datepicker value={value} onChange={handleValueChange} />
            </div>
            <div className="text-red-700">
              {/* <input
            value={resourceVal}
            type="text"
            list="data"
            name="resource"
            onChange={handleChange}
          /> */}
              <select name="resource" defaultValue={job.resource?.id}>
                {options.map((op: Resource) => (
                  <option key={op.id} value={op.id}>
                    {op.firstName} {op.lastName}
                  </option>
                ))}
              </select>
              <button type="submit">
                <FontAwesomeIcon
                  onClick={() => {
                    document.body.style.overflow = "visible";
                    onClose();
                  }}
                  icon={faTimes}
                />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
