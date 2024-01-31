import bcryptjs from 'bcryptjs'

const hashPassword = async (password) => {
  const salt = await bcryptjs.genSalt(10);
  const hashPassword = await bcryptjs.hash(password, salt);
  return hashPassword;
}

export { hashPassword }