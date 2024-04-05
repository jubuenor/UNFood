import dotenv from "dotenv";

dotenv.config();
//MONGO
const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_HOST = process.env.MONGO_HOST || "";
const SERVER_PORT = process.env.SERVER_PORT ?? 3000;
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`;
//AWS
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME || "";
const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION || "";
const AWS_PUBLIC_KEY = process.env.AWS_PUBLIC_KEY || "";
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEYY || "";

export const config = {
  mongo: {
    username: MONGO_USERNAME,
    password: MONGO_PASSWORD,
    url: MONGO_URL,
  },
  server: {
    port: SERVER_PORT,
  },
  aws: {
    bucket_name: AWS_BUCKET_NAME,
    bucket_region: AWS_BUCKET_REGION,
    public_key: AWS_PUBLIC_KEY,
    secret_key: AWS_SECRET_KEY,
  },
};
