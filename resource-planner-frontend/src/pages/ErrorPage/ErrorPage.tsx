import { faBackward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const ErrorPage = () => {
  const { msg } = useParams();
  const navigate = useNavigate();
  return (
    <>
      <button className="p-2 " onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faBackward} />
        <span className="p-2 ">Go back</span>
      </button>
      <div className="flex flex-col h-screen w-100 justify-center items-center">
        <h1 className="text-xl font-bold">woops...Something went wrong !</h1>
        <h1 className="text-lg font-bold">Try again later.</h1>
        <p className="text-lg">{msg}</p>
      </div>
    </>
  );
};

export default ErrorPage;
