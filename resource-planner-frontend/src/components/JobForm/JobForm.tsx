import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { Job, Resource } from "../../services/api-responses_interfaces";
import {
  getAllResources,
  getAvailableResources,
} from "../../services/resource-sevices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const JobForm = ({ onSubmit }: { onSubmit: (newJob: Partial<Job>) => any }) => {
  const [resourceVal, setResourceVal] = useState("not assigned");
  const [value, setValue] = useState<DateValueType>({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [options, setOptions] = useState<Resource[]>([]);
  useEffect(() => {
    if (value) {
      getAvailableResources(value.startDate, value.endDate).then((data) =>
        setOptions(data)
      );
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

  const handleSubmit = (event: any): void => {
    //event.preventDefault();
    const formData =
      Object.fromEntries(
        new FormData(formRef.current || undefined).entries()
      ) || null;
    const newJob: Partial<Job> = formData;
    newJob.startDate = value?.startDate;
    newJob.endDate = value?.endDate;
    if (formData.resource == -1) {
      newJob.resource = null;
    } else {
      newJob.resource = parseInt(formData.resource);
    }
    console.log(newJob);
    onSubmit(newJob);
  };
  return (
    <form
      className="bg-slate-400 fixed bottom-0 border-4 border-slate-700 z-50 box-border mx-2"
      style={{ width: "calc(100% - 166px)" }}
      ref={formRef}
      onSubmit={handleSubmit}
    >
      <div
        className="p-2 border border-gray-100 grid grid-cols-4 gap-8 hover:bg-slate-500"
        style={{ gridTemplateColumns: "1fr 1fr 1fr 45px" }}
      >
        <input className="text-lg font-semibold" name="name" required></input>
        <div>
          <Datepicker value={value} onChange={handleValueChange} />
        </div>
        <select name="resource" defaultValue={-1}>
          <option value={-1}>Not Assigned</option>
          {options.map((op: Resource) => (
            <option key={op.id} value={op.id}>
              {op.firstName} {op.lastName}
            </option>
          ))}
        </select>
        <button type="submit">
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </form>
  );
};

export default JobForm;
