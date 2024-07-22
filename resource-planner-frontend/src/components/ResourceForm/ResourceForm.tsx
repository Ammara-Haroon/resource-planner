import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { Job, Resource } from "../../services/api-responses_interfaces";
import {
  getAllResources,
  getAvailableResources,
} from "../../services/resource-sevices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const ResourceForm = ({
  onSubmit,
}: {
  onSubmit: (newResource: Partial<Resource>) => any;
}) => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = (event: any): void => {
    //event.preventDefault();
    const formData =
      Object.fromEntries(
        new FormData(formRef.current || undefined).entries()
      ) || null;
    const newResource: Partial<Resource> = { ...formData };
    console.log(newResource);
    onSubmit(newResource);
  };
  return (
    <form
      className="bg-slate-400 w-full fixed bottom-0 border border-black z-50"
      ref={formRef}
      onSubmit={handleSubmit}
    >
      <div
        className="p-2 border border-gray-100 grid grid-cols-4 gap-8 hover:bg-slate-500"
        style={{ gridTemplateColumns: "1fr 1fr 1fr 10px" }}
      >
        <input
          className="text-lg font-semibold"
          name="firstName"
          placeholder="First Name"
          required
        ></input>
        <input
          className="text-lg font-semibold"
          name="lastName"
          placeholder="Last Name"
          required
        ></input>
        <input
          className="text-lg font-semibold"
          name="imageUrl"
          placeholder="Image URL"
        ></input>
        <button type="submit">
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </form>
  );
};

export default ResourceForm;
