import { formatDistanceToNow } from "date-fns-jalali";
import { faIR } from "date-fns-jalali/locale";
import { format } from 'date-fns-jalali';
import { parseISO } from 'date-fns';
import dayjs from "dayjs";
import jalaliday from "jalaliday";


dayjs.extend(jalaliday);


function formatNumberWithCommas(input) {
  if (!input) return input;
  return input.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function removeCommas(input) {
  if (!input) return input;
  return input.replace(/,/g, "");
}

export function formatRelativeTimeInPersian(dateString) {
  const date = new Date(dateString);
  return formatDistanceToNow(date, { addSuffix: true, locale: faIR });
}

export function getTimeRemaining(targetDate) {
  const now = new Date();
  const target = new Date(targetDate);

  const timeDiff = target - now;

  if (timeDiff > 0) {
    const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return `${daysRemaining} روز باقی مانده است`;
  } else {
    return "به پایان رسیده است";
  }
}


const persianMonths = {
  Farvardin: "فروردین",
  Ordibehesht: "اردیبهشت",
  Khordad: "خرداد",
  Tir: "تیر",
  Mordaad: "مرداد",
  Shahrivar: "شهریور",
  Mehr: "مهر",
  Aban: "آبان",
  Azar: "آذر",
  Dey: "دی",
  Bahman: "بهمن",
  Esfand: "اسفند",
};

export const formatDate = (dateString)=> {
  const date = dayjs(dateString).calendar("jalali");
  const day = date.format("D");
  const month = persianMonths[date.format("MMMM")];
  const year = date.format("YYYY");
  const hour = date.hour();
  const minute = date.minute();
  const formattedTime = `${hour}:${
    minute < 10 ? "0" + minute : minute
  } `;

  

return {year,day,month,formattedTime};
};

export default formatNumberWithCommas;
