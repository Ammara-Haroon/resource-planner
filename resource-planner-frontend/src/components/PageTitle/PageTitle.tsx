import React from "react";

const PageTitle = ({ title }: { title: string }) => {
  return (
    <h1 className="bg-slate-900 font-mono my-5 p-2 text-pink-500 text-3xl uppercase">
      {title}
    </h1>
  );
};

export default PageTitle;
