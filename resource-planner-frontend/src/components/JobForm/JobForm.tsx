import { useEffect, useRef, useState } from "react";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { JobData, Resource } from "../../services/api-responses_interfaces";
import {
  getAllResources,
  getAvailableResources,
} from "../../services/resource-sevices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import ComboBox, { IComboBoxOption } from "../ComboBox/ComboBox";

const JobForm = ({ onSubmit }: { onSubmit: (newJob: JobData) => any }) => {
  const [selectedResource, setSelectedResource] = useState("Not Assigned");
  const jobNameRef = useRef<HTMLInputElement>(null);
  const [dateRange, setDateRange] = useState<DateValueType>({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    if (dateRange && dateRange.startDate && dateRange.endDate) {
      getAvailableResources(
        new Date(dateRange.startDate),
        new Date(dateRange.endDate)
      ).then((data) => setResources(data));
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
    const newJob: JobData = {
      name: jobNameRef.current?.value || "",
      startDate: new Date(dateRange.startDate),
      endDate: new Date(dateRange.endDate),
      resource: selectedResource == "-1" ? null : parseInt(selectedResource),
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

  return (
    <form
      className="bg-slate-400 fixed bottom-0 border-4 border-slate-700 z-5 box-border  w-[calc(100%-20px)] md:w-[calc(100%-256px)]"
      onSubmit={handleSubmit}
    >
      <div
        className="p-2 items-center grid grid-cols-4 gap-4 hover:bg-slate-500"
        style={{ gridTemplateColumns: "1fr 1fr 1fr 45px" }}
      >
        <input
          className="text-slate-900 px-2 w-11/12 bg-slate-100 h-9 rounded-md"
          name="name"
          type="text"
          pattern=".*[A-Za-z].*"
          ref={jobNameRef}
          placeholder="Job Description"
          required
        ></input>
        <div className="flex w-full justify-center">
          <div className="w-11/12">
            <Datepicker value={dateRange} onChange={handleDateRangeChange} />
          </div>
        </div>
        <ComboBox
          options={options}
          defaultValue={selectedResource}
          name="resource"
          id="resource"
          opensUp={true}
          onSelect={(event: any) => {
            setSelectedResource(event.target.value);
          }}
        />
        <button type="submit">
          <FontAwesomeIcon className="px-5 text-xl" icon={faPlus} />
        </button>
      </div>
    </form>
  );
};

export default JobForm;
