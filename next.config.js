// check production status
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  env: {
    BASE_URL: 'http://localhost:5000',
  },
  target: 'serverless'
};