import { Job } from "./api-responses_interfaces";

interface ITimeBound {
  startDate: Date;
  endDate: Date;
}
export const getDatesInMonthCalendar = (year: number, month: number) => {
  let date = new Date(year, month, 1, 0, 0, 0);
  let dates = [];
  let prevMonthDays = date.getDay() === 0 ? 6 : date.getDay() - 1;
  date.setDate(date.getDate() - prevMonthDays);
  for (let i = 0; i < prevMonthDays; ++i) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  while (date.getMonth() === month) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
};

export const getMaxDate = (jobs: ITimeBound[]): Date => {
  let maxDate = new Date(jobs[0].endDate);
  for (let i = 0; i < jobs.length; ++i) {
    // console.log(jobs[i].endDate, maxDate);
    if (jobs[i].endDate.getTime() > maxDate.getTime()) {
      maxDate = new Date(jobs[i].endDate);
    }
  }
  return maxDate;
};

export const isBetween = (date: Date, date1: Date, date2: Date): boolean => {
  date.setHours(0, 0, 0, 0);
  date1.setHours(0, 0, 0, 0);
  date2.setHours(0, 0, 0, 0);
  //console.log(date, date1, date2);
  if (date1.getTime() <= date.getTime() && date2.getTime() >= date.getTime())
    return true;

  return false;
};
export const colors = [
  "#ef719b",
  "#b460db",
  "#ff8039",
  "rgb(134 239 172)",
  "#55bedb",
  "#f7de20",
];
export const getMinDate = (jobs: ITimeBound[]): Date => {
  let minDate = new Date(jobs[0].endDate);
  for (let i = 0; i < jobs.length; ++i) {
    //console.log(jobs[i].startDate, minDate);
    if (jobs[i].startDate.getTime() < minDate.getTime()) {
      minDate = new Date(jobs[i].startDate);
    }
  }
  return minDate;
};

export const getAllDatesBetween = (minDate: Date, maxDate: Date) => {
  let dates: Date[] = [];
  maxDate.setHours(0, 0, 0, 0);
  minDate.setHours(0, 0, 0, 0);
  const mills = maxDate.getTime();
  while (minDate && minDate.getTime() <= mills) {
    dates.push(new Date(minDate));
    minDate.setDate(minDate.getDate() + 1);
  }
  return dates;
};
