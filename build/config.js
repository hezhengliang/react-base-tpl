const path = require('path')
const EXCLUE_DIR = /node_modules/;
const PROJECT_PATH = path.resolve(__dirname, '../')
const IS_DEV = process.env.NODE_ENV === 'development';
const prepareURLs = require('./utils/prepareURLs.js');

const defaults = {
  host: '0.0.0.0',
  port: 8087
}

const HOST = defaults.host
const PORT = defaults.port
const URLS_INFO = prepareURLs(
  'http',
  defaults.host,
  defaults.port,
  '/'
)
module.exports = {
  EXCLUE_DIR,
  IS_DEV,
  PROJECT_PATH,
  PORT,
  HOST,
  URLS_INFO
}