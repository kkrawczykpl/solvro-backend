import {
  cleanEnv, str, port
} from 'envalid';

function validateEnv() {
  cleanEnv(process.env, {
    BASE_URL: str(),
    MONGO_USER: str(),
    MONGO_PASSWORD: str(),
    MONGO_PATH: str(),
    PORT: port(),
    JWT_SECRET: str()
  });
}

export { validateEnv }