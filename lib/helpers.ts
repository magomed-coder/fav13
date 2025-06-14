import { COLORS } from "@/constants/theme";
import {
  Contract,
  Order,
  PaymentCalendarEntry,
  Receipt,
  UserData,
} from "@/types";

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Форматирует часть с тысячами
 */
function insertThousandsSeparator(intPart: string, sep: string = " "): string {
  // \B — между цифрами, где не начало/конец строки,
  // (?=(\d{3})+(?!\d)) — перед каждым блоком по 3 цифры
  return intPart.replace(/\B(?=(\d{3})+(?!\d))/g, sep);
}

/**
 * Форматирует число:
 * - Округляет до decimals знаков (по умолчанию 0)
 * - Разделяет тысячи неразрывным пробелом
 * - Возвращает строку вида "1 234 567,89" (или без дробной части)
 */
export function formatNumberRegex(
  value: number,
  decimals: number = 0,
  thousandSep: string = " ",
  decimalSep: string = ","
): string {
  // 1) Округление и получение строкового представления
  const rounded = value.toFixed(decimals); // e.g. "1234567.89" или "1234568"

  // 2) Разделяем на целую и дробную части
  const [intPart, fracPart] = rounded.split(".");

  // 3) Вставляем сепаратор тысяч
  const withThousands = insertThousandsSeparator(intPart, thousandSep);

  // 4) Склеиваем обратно: если decimals = 0 — без дробной точки
  return decimals > 0
    ? `${withThousands}${decimalSep}${fracPart}`
    : withThousands;
}

export const formatDateToMonth = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("ru-RU", {
    month: "short",
  })
    .format(date)
    .toLowerCase();
};

export interface ContractData {
  contract?: Contract;
  order?: Order;
  receipts: Receipt[];
  paymentcalendar?: PaymentCalendarEntry;
}

/**
 * Given a raw idParam and the user payload,
 * returns the matching contract, order, and sorted receipts.
 */
export function getContractData(
  idParam: string | undefined,
  user: UserData
): ContractData {
  // parse the id once, bail early if invalid
  const idNum = idParam ? Number(idParam) : NaN;
  if (isNaN(idNum) || !user.contracts) {
    return {
      contract: undefined,
      order: undefined,
      receipts: [],
      paymentcalendar: undefined,
    };
  }

  // find the matching contract
  const contract = user.contracts.find((c) => c.id === idNum);

  // find the order linked to this contract
  const order = user.orders?.find((o) => o.contract === contract?.id);

  // find the order linked to this contract
  const paymentcalendar = user.paymentcalendar?.find(
    (pc) => pc.contract === contract?.id
  );

  // filter & sort receipts by date ascending
  const receipts = (user.receipts ?? [])
    .filter((r) => r.contract === contract?.id)
    .sort(
      (a, b) =>
        new Date(a.receipt_date).getTime() - new Date(b.receipt_date).getTime()
    );

  return { contract, order, receipts, paymentcalendar };
}

/**
 * Форматирует дату-строку в формат "DD.MM.YYYY г."
 * @param dateStr — ISO-строка или любой формат, поддерживаемый new Date()
 */
export function formatDateWithYear(dateStr: string): string {
  const date = new Date(dateStr);

  // Получаем день и месяц с ведущим нулём
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year} г.`;
}

const monthFormatter = new Intl.DateTimeFormat("ru", { month: "long" });

/**
 * Форматирует дату в строку вида "Июнь 2024 г."
 * - Если dateStr не передали или он некорректен, берём текущую дату.
 * @param dateStr — ISO-строка или undefined/null
 */
export function formatMonthYear(dateStr?: string | null): string {
  // Парсим дату: если не передали или new Date() вернёт "Invalid Date", используем текущее время
  const parsed = dateStr ? new Date(dateStr) : new Date();
  const date = isNaN(parsed.getTime()) ? new Date() : parsed;

  // Форматируем месяц с заглавной буквы
  const month = monthFormatter
    .format(date) // "июнь"
    .replace(/^./, (c) => c.toUpperCase()); // "Июнь"

  const year = date.getFullYear(); // 2024

  return `${month} ${year} г.`;
}

/**
 * Возвращает строку вида "rgba(r, g, b, alpha)" с теми же r, g, b, что и COLORS.BGLightBlue,
 * а alpha меняется линейно от 1 (index=0) до 0.5 (index=total-1).
 *
 * @param index – индекс текущего элемента (0-based)
 * @param total – общее количество элементов
 * @returns строка "rgba(r, g, b, alpha)"
 */
export function getContractItemBgColor(index: number, total: number): string {
  // 1) Берём базовый цвет (фиксированный RGB + α=1)
  const baseColor = COLORS.BGLightBlue;

  // 2) Парсим строку "rgba(r, g, b, 1)" → ["193", "223", "245", "1"]
  const parts = baseColor
    .replace("rgba(", "")
    .replace(")", "")
    .split(",")
    .map((s) => s.trim());
  const r = parts[0];
  const g = parts[1];
  const b = parts[2];
  // const origA = parts[3]; // всегда "1", нам не нужен

  // 3) Вычисляем alpha:
  let alpha: number;
  if (total <= 1) {
    // Если всего один элемент, оставляем полностью непрозрачным
    alpha = 1;
  } else {
    // Линейный спуск: от 1 (index=0) до 0.5 (index=total-1)
    alpha = 1 - (index / (total - 1)) * 0.5;
    // На всякий случай «прищёлкиваем» границы:
    if (alpha < 0.5) alpha = 0.5;
    if (alpha > 1) alpha = 1;
  }

  // 4) Собираем итоговую строку и возвращаем
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Извлечь из nomenclature название жилого комплекса после "г. Грозный," до следующей запятой.
 * Если паттерн не найден, вернуть весь исходный строковый адрес.
 *
 * @param nomenclature - строка адреса из Order.nomenclature
 * @returns название жилого комплекса или исходная nomenclature
 */
export function extractResidentialComplex(nomenclature?: string): string {
  if (!nomenclature) return "";
  const match = nomenclature.match(/г\. Грозный,\s*([^,]+)/);
  return match && match[1] ? match[1].trim() : nomenclature;
}
