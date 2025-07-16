import {
  addMonths,
  eachMonthOfInterval,
  format,
  isAfter,
  isSameMonth,
  parseISO,
  startOfMonth,
} from "date-fns";
import { ru } from "date-fns/locale";

export interface CalendarMonth {
  monthKey: string;
  display: string;
  paid: boolean;
}

export type PaymentCalendarEntry = {
  first_payment_date: string;
  final_payment_date: string;
  due_now: string;
  // …other fields
};

export function buildPaymentCalendar(
  entry: PaymentCalendarEntry | undefined,
  totalPaid: number,
  avgMonthlyPayment: number
): CalendarMonth[] {
  if (!entry || avgMonthlyPayment <= 0) return [];

  // 1. Parse and enumerate
  const startDate = parseISO(entry.first_payment_date);
  const endDate = parseISO(entry.final_payment_date);
  const today = new Date();
  const thisMonth = startOfMonth(today);

  // 2. Построение массива «каждый месяц в тот же день»
  const scheduledMonths: Date[] = [];
  let cursor = startDate;
  while (!isAfter(cursor, endDate)) {
    scheduledMonths.push(cursor);
    cursor = addMonths(cursor, 1);
  }

  // 2. Locate “current” month in the schedule
  let currentIdx = scheduledMonths.findIndex((dt) =>
    isSameMonth(dt, thisMonth)
  );
  if (currentIdx < 0) {
    // if today before first month
    currentIdx = 0;
  }

  // 3. Pre-mark up-to-today as paid
  const calendar: CalendarMonth[] = scheduledMonths.map((dt, idx) => ({
    monthKey: format(dt, "yyyy-MM"),
    display: format(dt, "MMM", { locale: ru }).toLowerCase(),
    paid: idx <= currentIdx,
  }));

  const dueNowNum = +entry.due_now;

  // console.log({ scheduledMonths, currentIdx, dueNowNum });
  // console.log({ dueNowNum });

  // 4a. Underpaid?
  if (totalPaid < dueNowNum) {
    const deficit = dueNowNum - totalPaid;
    // console.log("totalPaid < dueNowNum", deficit);
    const monthsBehind = Math.ceil(deficit / avgMonthlyPayment);

    for (let i = 0; i < monthsBehind; i++) {
      const idxToMark = currentIdx - i;
      if (idxToMark >= 0) {
        calendar[idxToMark].paid = false;
      }
    }
    return calendar;
  }

  // 4b. Overpaid?
  if (totalPaid > dueNowNum) {
    const surplus = totalPaid - dueNowNum;
    const extraMonths = Math.floor(surplus / avgMonthlyPayment);
    // console.log("totalPaid > dueNowNum", surplus);

    // Flip the next `extraMonths` scheduled months after today
    for (let i = 1; i <= extraMonths; i++) {
      const idxToMark = currentIdx + i;
      if (idxToMark < calendar.length) {
        calendar[idxToMark].paid = true;
      }
    }
    // console.log({ calendar });
    return calendar;
  }
  // console.log("Exactly on schedule");
  // 4c. Exactly on schedule?
  return calendar;
}
