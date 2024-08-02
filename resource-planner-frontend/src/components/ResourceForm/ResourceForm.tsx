import React, { FormEvent, useRef, useState } from "react";
import { ResourceData } from "../../services/api-responses_interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const ResourceForm = ({
  onSubmit,
}: {
  onSubmit: (newResource: ResourceData) => any;
}) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const formData = Object.fromEntries(
      new FormData((formRef.current && formRef.current) || undefined)
    );
    const newResource: ResourceData = {
      imageFile: null,
      firstName: "",
      lastName: "",
      ...formData,
    };
    onSubmit(newResource);
  };

  return (
    <form
      className="bg-slate-400 fixed bottom-0 border-4 border-slate-700 z-5 box-border w-[calc(100%-256px)]"
      ref={formRef}
      onSubmit={handleSubmit}
    >
      <div
        className="p-2 border border-red-700 grid  hover:bg-slate-500 items-center"
        style={{ gridTemplateColumns: "1fr 1fr 1fr 45px" }}
      >
        <input
          className="text-slate-900 px-2 w-11/12 bg-slate-100 h-9 rounded-md"
          name="firstName"
          placeholder="First Name"
          type="text"
          pattern="[A-Za-z ]*[A-Za-z][A-Za-z ]*"
          required
        ></input>
        <input
          className="text-slate-900 px-2 w-11/12 bg-slate-100 h-9 rounded-md"
          name="lastName"
          placeholder="Last Name"
          type="text"
          pattern="[A-Za-z ]*[A-Za-z][A-Za-z ]*"
          required
        ></input>
        <input
          type="file"
          className="text-slate-900 p-1 w-11/12 bg-slate-100 h-9 rounded-md"
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
