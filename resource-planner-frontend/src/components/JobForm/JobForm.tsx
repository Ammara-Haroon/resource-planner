import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { Job, Resource } from "../../services/api-responses_interfaces";
import {
  getAllResources,
  getAvailableResources,
} from "../../services/resource-sevices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faPlus } from "@fortawesome/free-solid-svg-icons";
import { addJob, createJob } from "../../services/job-services";

const JobForm = () => {
  const [resourceVal, setResourceVal] = useState("not assigned");
  const [value, setValue] = useState<DateValueType>({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [options, setOptions] = useState<Resource[]>([]);
  useEffect(() => {
    getAllResources().then((data) => setOptions(data));
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
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    console.log(event.target.value);
    const strIn = event.target.value;
    if (
      options.some((option) => {
        const fullName = `${option.firstName} ${option.lastName}`;
        console.log(
          fullName.substring(0, strIn.length),
          strIn.localeCompare(fullName.substring(0, strIn.length)) === 0
        );
        return (
          strIn
            .toLowerCase()
            .localeCompare(
              fullName.substring(0, strIn.length).toLowerCase()
            ) === 0
        );
      })
    ) {
      console.log("great");
      setResourceVal(strIn);
    }
  };
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleClick = (event: any): void => {
    event.preventDefault();
    const formData =
      Object.fromEntries(new FormData(formRef.current).entries()) || null;
    const newJob: Partial<Job> = formData;
    newJob.startDate = value?.startDate;
    newJob.endDate = value?.endDate;
    console.log(value.startDate, value.endDate);
    console.log(newJob);
    createJob(formData);
  };
  return (
    <form ref={formRef}>
      <div className="grid grid-cols-4 divide-y-2 gap-2 w-full">
        <input className="text-lg font-semibold" name="name" required></input>
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
          <select name="resource">
            {options.map((op: Resource) => (
              <option key={op.id} value={op.id}>
                {op.firstName} {op.lastName}
              </option>
            ))}
          </select>
          <button type="submit">
            <FontAwesomeIcon onClick={handleClick} icon={faPlus} />
          </button>
        </div>
      </div>
    </form>
  );
};

export default JobForm;
