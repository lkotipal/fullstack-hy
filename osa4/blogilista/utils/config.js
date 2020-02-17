require('dotenv').config()

const { PORT } = process.env
let MONGODB_URI

switch (process.env.NODE_ENV) {
case 'test':
  MONGODB_URI = process.env.TEST_MONGODB_URI
  break
default:
  MONGODB_URI = process.env.MONGODB_URI
  break
}

module.exports = {
  MONGODB_URI,
  PORT,
}
