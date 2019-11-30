export const isDevelopment = process.env.NODE_ENV === 'development';
export const apiUrl = isDevelopment ? 'http://localhost:3001/api' : 'https://git.heroku.com/shop-mocky/api';
export const appName = 'shop';