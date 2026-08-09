import 'dotenv/config';

export const PORT = process.env.PORT || 5000;
export const DATABASE_URL =
  process.env.DATABASE_URL ||
  'postgres://rental_app:rental_app_pass_2026@localhost:5432/rental_management';
export const JWT_SECRET = process.env.JWT_SECRET || 'hackathon_secret';
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';