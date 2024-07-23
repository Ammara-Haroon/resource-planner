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
