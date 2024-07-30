import React from "react";
import { Job } from "../../services/api-responses_interfaces";
import { isBetween } from "../../services/utils";

const WeekView = ({ jobs }: { jobs: Partial<Job>[] | null }) => {
  const dayBoxStyle = "flex justify-center items-center p-1 h-5 w-5";
  const dayBoxGreyed = `${dayBoxStyle} bg-slate-300`;
  const dayBoxFilled = `${dayBoxStyle} bg-pink-300`;
  const dayLabelStyle = "text-xs text-slate-100";

  const days = ["M", "T", "W", "Th", "F"];
  const today = new Date();
  let dayNum = today.getDay();
  //console.log(weekDays[today.getDay() - 1]);
  dayNum = dayNum === 0 || dayNum === 6 ? 0 : dayNum - 1;
  const weekDays = days.map(
    (day, index) => days[(dayNum + index) % days.length]
  );

  // function getDate(dayNum: number) {
  //   const day = today.getDay();
  //   const diff = today.getDate() - day + (day == 0 ? -6 : 1) + dayNum; // adjust when day is sunday
  //   return new Date(today.setDate(diff));
  // }

  //const datesMap2 = weekDays.map((day, index) => getDate(index));

  const datesMap = weekDays.map((day, index) => {
    let offset = index;
    if (today.getDay() + offset === 0) offset = offset + 1;
    if (today.getDay() + offset === 6) offset = offset + 2;

    console.log(offset);
    const diff = today.getDate() + offset;
    return new Date(new Date().setDate(diff));
  });

  console.log(datesMap);

  const colorMap = datesMap.map((day) => {
    day.setHours(0, 0, 0, 0);
    return jobs?.some((job) => {
      //job.startDate?.setHours(0, 0, 0, 0);
      //job.endDate?.setHours(0, 0, 0, 0);
      return isBetween(day, job.startDate, job.endDate);
      // job.startDate &&
      // job.startDate <= day &&
      // job.endDate &&
      // job.endDate >= day
    });
  });

  // console.log(colorMap);
  // datesMap.forEach((day) =>
  //   jobs?.forEach((job) =>
  //     console.log(job.startDate <= day, job.endDate >= day)
  //   )
  // );
  return (
    <div className="flex gap-1">
      {weekDays.map((day, index) => (
        <div
          key={index}
          className={colorMap[index] ? dayBoxFilled : dayBoxGreyed}
        >
          <span className={dayLabelStyle}>{day}</span>
        </div>
      ))}
    </div>
  );
};

export default WeekView;
