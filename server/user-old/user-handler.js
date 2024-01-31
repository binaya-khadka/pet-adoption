import httpStatus from 'http-status'

const handler = async (req, res) => {
  const {name, email} = req.body

  try {
    const user = await userService.register({name, email})
    return res.status()

  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
  }

}