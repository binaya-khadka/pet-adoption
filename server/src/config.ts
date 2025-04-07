import { config as _config } from 'dotenv'

_config();

const config = {
  port: process.env.PORT || 3000,
  databaseUrl: process.env.MONGO_URI,
  totalValidationDays: process.env.TOTAL_VALIDATION_DAYS || 250,
  jwtSecret: process.env.JWT_SECRET
}

export default config