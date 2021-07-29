declare namespace NodeJS {
  interface ProcessEnv {
    EMAIL_ID: string;
    EMAIL_PASSWORD: string;
    WEBSITE_URL: string;
    SERVER_URL: string;
    DATABASE_URL: string;
    REDIS_URL: string;
    PORT: string;
    SESSION_SECRET: string;
  }
}