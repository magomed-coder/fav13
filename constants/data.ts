import icons from "./icons";

export const categories = [
  { title: "All", category: "All" },
  { title: "Houses", category: "House" },
  { title: "Condos", category: "Condos" },
  { title: "Duplexes", category: "Duplexes" },
  { title: "Studios", category: "Studios" },
  { title: "Villas", category: "Villa" },
  { title: "Apartments", category: "Apartments" },
  { title: "Townhomes", category: "Townhomes" },
  { title: "Others", category: "Others" },
];

export const settings = [
  {
    title: "Мои бронирования",
    icon: icons.calendar,
  },
  {
    title: "Платежи",
    icon: icons.wallet,
  },
  {
    title: "Профиль",
    icon: icons.person,
  },
  {
    title: "Уведомления",
    icon: icons.bell,
  },
  {
    title: "Безопасность",
    icon: icons.shield,
  },
  {
    title: "Язык",
    icon: icons.language,
  },
  {
    title: "Центр поддержки",
    icon: icons.info,
  },
  {
    title: "Пригласить друзей",
    icon: icons.people,
  },
];

export const facilities = [
  {
    title: "Laundry",
    icon: icons.laundry,
  },
  {
    title: "Car Parking",
    icon: icons.carPark,
  },
  {
    title: "Sports Center",
    icon: icons.run,
  },
  {
    title: "Cutlery",
    icon: icons.cutlery,
  },
  {
    title: "Gym",
    icon: icons.dumbell,
  },
  {
    title: "Swimming pool",
    icon: icons.swim,
  },
  {
    title: "Wifi",
    icon: icons.wifi,
  },
  {
    title: "Pet Center",
    icon: icons.dog,
  },
];

export const MIN_COST = 500_000;
export const MAX_COST = 100_000_000;

export const options = [
  { key: "secondary", label: "Вторичное жилье" },
  { key: "car_light", label: "Легковое авто" },
  { key: "car_heavy", label: "Грузовое авто (техника)" },
  { key: "new_with", label: "Новостройки (с пер. взносом)" },
  { key: "new_without", label: "Новостройки (без пер. взноса)" },
];

interface OptionConfig {
  key: string;
  label: string;
  minDownPercent: number; // минимальный % первого взноса
  minYears: number; // минимальный срок (в годах)
  maxYears: number; // максимальный срок (в годах)
  markupRates: number[]; // наценка (%) для каждого года рассрочки
}
