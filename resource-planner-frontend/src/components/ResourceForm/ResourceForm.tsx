import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import {
  Job,
  Resource,
  ResourceData,
} from "../../services/api-responses_interfaces";
import {
  getAllResources,
  getAvailableResources,
} from "../../services/resource-sevices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const ResourceForm = ({
  onSubmit,
}: {
  onSubmit: (newResource: ResourceData) => any;
}) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setSelectedFile(null);
    }
  };
  const handleSubmit = (event: any): void => {
    //event.preventDefault();
    const formData = Object.fromEntries(
      new FormData(formRef.current).entries()
    );
    //formData[imageFile] = selectedFile;
    console.log(formData);
    const newResource: ResourceData = {
      ...formData,
    };
    console.log(newResource);
    onSubmit(newResource);
  };

  return (
    <form
      className="bg-slate-400 fixed bottom-0 border-4 border-slate-700 z-50 box-border w-[calc(100%-256px)]"
      ref={formRef}
      onSubmit={handleSubmit}
    >
      <div
        className="p-2 border border-gray-100 grid grid-cols-4 gap-8 hover:bg-slate-500"
        style={{ gridTemplateColumns: "1fr 1fr 1fr 45px" }}
      >
        <input
          className="text-lg font-semibold px-1"
          name="firstName"
          placeholder="First Name"
          required
        ></input>
        <input
          className="text-lg font-semibold  px-1"
          name="lastName"
          placeholder="Last Name"
          required
        ></input>
        <input
          type="file"
          className="text-lg font-semibold"
          name="imageFile"
          onChange={handleFileChange}
        ></input>
        <button type="submit">
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </form>
  );
};

export default ResourceForm;
