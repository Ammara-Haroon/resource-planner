import React from "react";

const PageTitle = ({ title }: { title: string }) => {
  return (
    <h1 className="md:text-left text-center font-mono my-5 p-2 text-pink-500 text-3xl uppercase">
      {title}
    </h1>
  );
};

export default PageTitle;
