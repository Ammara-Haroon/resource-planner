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
  return (
    <div>
      <div className="flex justify-between">
        <small>
          {startDate.getDate()}{" "}
          {startDate.toLocaleString("default", { month: "short" })}
        </small>
        <small>
          {endDate.getDate()}{" "}
          {endDate.toLocaleString("default", { month: "short" })}
        </small>
      </div>
      <div className="border-4 rounded-xl border-neutral-700 w-full h-5 bg-neutral-300">
        {progress !== 0 && (
          <div
            className="border-4 rounded-xl border-transparent w-full h-full bg-pink-500"
            style={{ width: `${progress}%` }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
