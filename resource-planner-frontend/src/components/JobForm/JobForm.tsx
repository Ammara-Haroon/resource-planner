import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { Job, Resource } from "../../services/api-responses_interfaces";
import {
  getAllResources,
  getAvailableResources,
} from "../../services/resource-sevices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faPlus,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons/faArrowDown";
import ProfilePic from "../../assets/profile_placeholder.jpg";

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
  const [showOptions, setShowOptions] = useState(false);
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
        {/* <select name="resource" defaultValue={-1}>
          <option value={-1}>Not Assigned</option>
          {options.map((op: Resource) => (
            <option key={op.id} value={op.id}>
              {op.firstName} {op.lastName}
            </option>
          ))}
        </select> */}
        <div className="relative text-slate-900">
          <div className="flex justify-center items-center">
            <input
              name="resource"
              className="p-2 w-full bg-slate-100"
              disabled
              defaultValue="Not Assigned"
            />
            <FontAwesomeIcon
              onClick={() => setShowOptions(!showOptions)}
              className="bg-slate-100 py-3 cursor-pointer p-1"
              icon={faAngleDown}
            />
          </div>
          {showOptions && (
            <div
              className="absolute bottom-11 rounded-md bg-neutral-200 z-50 w-full border border-slate-500 "
              onMouseLeave={() => setShowOptions(false)}
            >
              <div
                onClick={() => {
                  console.log("Not assigned");
                }}
                className="shadow-2xl flex items-center gap-1 hover:bg-slate-400 cursor-pointer"
              >
                <FontAwesomeIcon
                  className="h-5 w-5 rounded-full "
                  icon={faTimes}
                />
                <span>Not Assigned</span>
              </div>
              {options.map((op: Resource) => (
                <div
                  onClick={() => {
                    setShowOptions(false);
                    console.log(op.firstName);
                  }}
                  className="shadow-2xl flex items-center gap-1 hover:bg-slate-400 cursor-pointer"
                >
                  <img
                    className="h-5 w-5 rounded-full "
                    src={op.imageUrl || ProfilePic}
                    alt={op.firstName}
                  />
                  <span>
                    {op.firstName} {op.lastName}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        <button type="submit">
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </form>
  );
};

export default JobForm;
