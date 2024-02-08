import jwt from 'jsonwebtoken'
import config from '../config.js'

export const generateToken = (id) => {
  const expireOn = Math.floor(Date.now() / 1000) + 60 * 60 * config?.totalValidationDays
  return jwt.sign({
    exp: expireOn,
    id,
  },
    config?.jwtSecret
  )
}