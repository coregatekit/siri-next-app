// Time Durations
const ONE_MINUTE = 60 * 1000; // milliseconds
const ONE_HOUR = 60 * ONE_MINUTE; // milliseconds
const ONE_DAY = 24 * ONE_HOUR; // milliseconds
const ONE_WEEK = 7 * ONE_DAY; // milliseconds

const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';

const DB_POOL_MAX = 10; // Maximum number of connections in the pool
const DB_IDLE_TIMEOUT = 30000; // 30 seconds
const DB_CONNECTION_TIMEOUT = 2000; // 2 seconds
const DB_CONNECTION_STRING =
	process.env.DATABASE_URL || 'postgres://user:password@localhost:5432/mydb';

export {
	ONE_HOUR,
	ONE_DAY,
	ONE_WEEK,
	JWT_SECRET,
	DB_POOL_MAX,
	DB_IDLE_TIMEOUT,
	DB_CONNECTION_TIMEOUT,
	DB_CONNECTION_STRING,
};
