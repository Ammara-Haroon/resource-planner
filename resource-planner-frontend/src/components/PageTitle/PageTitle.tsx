import React from "react";

const PageTitle = ({ title }: { title: string }) => {
  return (
    <h1 className="bg-slate-900 font-bold p-1 text-green-800 text-xl">
      {title}
    </h1>
  );
};

export default PageTitle;
