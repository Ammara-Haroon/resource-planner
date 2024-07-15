import React from "react";

interface IProgressBarProps {
  startDate: Date;
  endDate: Date;
}
const ProgressBar = ({ startDate, endDate }: IProgressBarProps) => {
  const progress = Math.min(
    Math.max(
      (new Date().getTime() - startDate.getTime()) /
        (endDate.getTime() - startDate.getTime()),
      0
    ) * 100,
    100
  );

  //console.log(progress);
  return (
    <div className="hover:bg-slate-500">
      <div className="flex justify-between">
        <span>
          {startDate.getDate()}/{startDate.getMonth() + 1}
        </span>
        <span>
          {endDate.getDate()}/{endDate.getMonth() + 1}
        </span>
      </div>
      <div className="border-4 rounded-xl border-slate-700 w-full h-5 bg-gray-400">
        {progress !== 0 && (
          <div
            className="border-4 rounded-xl border-transparent w-full h-full bg-green-900"
            style={{ width: `${progress}%` }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
