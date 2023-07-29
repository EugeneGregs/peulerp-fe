const env = process.env.NODE_ENV;

export const BASE_URL =
  env === "development" ? "http://localhost:5071" : "http://localhost:5000";
  
export const EXPENSE_TYPES = [
  "Cleaning",
  "Stock Purchases",
  "Other Purchases",
  "Utilities",
  "Other",
];

export const PAYMENT_TYPES = ["Mobile", "Bank", "Cash"];
export const SUCCESS_CODES = [200, 201, 204];
export const AUTH_CODES = [401, 403];

export const USER_ROLES = [
  { value: 1, label: "Admin" },
  { value: 2, label: "Teller" },
  { value: 3, label: "Superviser" },
];

export const USER_STATUSES = [
    { value: 1, label: "Active" },
    { value: 2, label: "Inactive" },
    { value: 3, label: "Suspended" },
    { value: 4, label: "Deleted"}
];
