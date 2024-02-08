import jwt, { decode } from 'jsonwebtoken'
import config from '../config.js'
import { userRepository } from '../user/index.js';
import { apiMethodUtils } from "../utils/index.js"

const verifyToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {

    const decodedData = jwt.verify(token, config?.jwtSecret);
    // jwt.verify will return exp, id(the user id), iat

    const user = await userRepository.fetchUserById(decodedData.id);

    if (!user) {
      throw {
        message: 'User not found',
      }
    }

    next();
  } catch (err) {
    console.log(err)
    apiMethodUtils.apiFail({ req, res, error: err, message: 'Something went wrong'})
  }

}

export { verifyToken }