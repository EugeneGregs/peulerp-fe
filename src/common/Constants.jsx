const env = process.env.NODE_ENV;

export const BASE_URL = env === 'development' ? 'http://localhost:5071' : 'http://localhost:5000';