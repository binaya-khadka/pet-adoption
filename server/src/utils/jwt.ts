import jwt from 'jsonwebtoken'
import { serverConfig } from 'src/lib'

export const generateToken = (id: string): string => {
  const expireOn = Math.floor(Date.now() / 1000) + 60 * 60 * serverConfig?.totalValidationDays
  return jwt.sign({
    exp: expireOn,
    id,
  },
    serverConfig?.jwtSecret
  )
}