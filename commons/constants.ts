// Time Durations
const ONE_MINUTE = 60 * 1000; // milliseconds
const ONE_HOUR = 60 * ONE_MINUTE; // milliseconds
const ONE_DAY = 24 * ONE_HOUR; // milliseconds
const ONE_WEEK = 7 * ONE_DAY; // milliseconds

const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';

export { ONE_HOUR, ONE_DAY, ONE_WEEK, JWT_SECRET };