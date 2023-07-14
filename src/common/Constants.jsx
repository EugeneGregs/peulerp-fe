const env = process.env.NODE_ENV;

export const BASE_URL = env === 'development' ? 'http://localhost:5071' : 'http://localhost:5000';
export const EXPENSE_TYPES = ["Cleaning", "Stock Purchases", "Other Purchases", "Utilities", "Other"];
export const PAYMENT_TYPES = ["Mobile","Bank","Cash"];
export const SUCCESS_CODES = [200, 201, 204];