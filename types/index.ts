// types.ts
export type PropertyType =
  | "House"
  | "Townhomes"
  | "Condos"
  | "Duplexes"
  | "Studios"
  | "Villa"
  | "Apartments"
  | "Others";

export type Facility =
  | "Laundry"
  | "Car Parking"
  | "Sports Center"
  | "Cutlery"
  | "Gym"
  | "Swimming pool"
  | "Wifi"
  | "Pet Center";

export interface Agent {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Review {
  id: string;
  name: string;
  avatar: string;
  review: string;
  rating: number; // 1-5
}

export interface GalleryImage {
  id: string;
  image: string;
}

export interface Property {
  id: string;
  name: string;
  type: PropertyType;
  description: string;
  address: string;
  geolocation: string;
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  rating: number;
  facilities: Facility[];
  image: string;
  agentId: string;
  reviewIds: string[];
  galleryIds: string[];
}

export interface SeedResult {
  agents: Agent[];
  reviews: Review[];
  galleries: GalleryImage[];
  properties: Property[];
}

export interface PropertyWithRelations extends Property {
  agent: Agent | undefined;
  reviews: Review[];
  gallery: GalleryImage[];
}

export type Contract = {
  id: number;
  code: string;
  name: string;
  number: string;
  date: string; // ISO 8601 date string: "YYYY-MM-DD"
  user: number; // likely a user ID reference
};

export type Order = {
  id: number;
  number: string;
  date: string; // ISO 8601 datetime string
  nomenclature: string;
  category: string;
  item_amount: string; // monetary values as strings
  total_amount: string;
  contract: number; // contract ID reference
};

export type Receipt = {
  id: number;
  receipt_date: string; // ISO 8601 datetime string
  receipt_number: string;
  payment_amount: string; // monetary value as string
  contract: number; // contract ID reference
  order: number; // order ID reference
};

export type PaymentCalendarEntry = {
  id: number;
  contract: number;
  order: number;
  due_now: string;
  due_now_vat: string;
  monthly_calendar_payment: number;
  first_payment_date: string; // consider naming them camelCase
  final_payment_date: string; // or Date if you’ll parse it immediately
  total_debt: string;
};

export type UserData = {
  username: string;
  avatarUrl?: string;
  userNameInDevice?: string;
  contracts: Contract[];
  orders: Order[];
  paymentcalendar: PaymentCalendarEntry[];
  receipts: Receipt[];
};
