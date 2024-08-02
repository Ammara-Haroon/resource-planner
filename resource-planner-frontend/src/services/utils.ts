export interface ITimeBound {
  startDate: Date;
  endDate: Date;
}

export const colors = ["#41436A", "#984063", "#F44668", "#FE9677"];

export const getMaxDate = (jobs: ITimeBound[]): Date | null => {
  if (jobs.length === 0) return null;

  let maxDate: Date = new Date(jobs[0].endDate);
  for (let i = 0; i < jobs.length; ++i) {
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
  if (date1.getTime() <= date.getTime() && date2.getTime() >= date.getTime())
    return true;

  return false;
};

export const getMinDate = (jobs: ITimeBound[]): Date | null => {
  if (jobs.length === 0) return null;
  let minDate = new Date(jobs[0].endDate);
  for (let i = 0; i < jobs.length; ++i) {
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

//returns a matrix of length date filled with index of jobs on that date
export const getBusyStatus = (dates: Date[], jobs: ITimeBound[]): number[] => {
  const status = new Array(dates.length).fill(-1);
  if (!jobs || jobs.length === 0) return status;

  for (let i = 0; i < jobs.length; ++i) {
    jobs[i].startDate.setHours(0, 0, 0, 0);
    jobs[i].endDate.setHours(0, 0, 0, 0);

    let index = dates.findIndex((date: Date) => {
      return date.getTime() === jobs[i].startDate.getTime();
    });

    if (index === -1) continue;

    while (dates[index].getTime() <= jobs[i].endDate.getTime()) {
      status[index] = i;
      index++;
      if (index >= dates.length) break;
    }
  }
  return status;
};
