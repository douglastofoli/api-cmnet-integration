import dotenv from 'dotenv';

dotenv.config();

export default {
  jwtSecret: String(process.env.JWT_SECRET)
};
