import dotenv from 'dotenv'
dotenv.config();

const BACKENDS = [
  { url: process.env.SERVER_ONE, healthy: true },
  { url: process.env.SERVER_TWO, healthy: true },
  { url: process.env.SERVER_THREE, healthy: true }
];

export default BACKENDS;
