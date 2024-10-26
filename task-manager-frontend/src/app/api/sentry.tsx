// src/app/api/sentry.ts
import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

if (!SENTRY_DSN) {
  throw new Error("Missing SENTRY_DSN environment variable");
}
// Initialize Sentry
Sentry.init({
  dsn: SENTRY_DSN, // Replace with your actual Sentry DSN
  tracesSampleRate: 1.0,
});

export const logger = {
  info: (message: string, data?: never) => {
    console.log(`[INFO] ${message}`, data);
    Sentry.captureMessage(message, {
      level: "info",
      extra: data,
    });
  },
  error: (message: string, error?: Error) => {
    console.error(`[ERROR] ${message}`, error);
    Sentry.captureException(error || new Error(message));
  },
};
