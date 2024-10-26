// Using Sentry for Debugging

import * as Sentry from "@sentry/nextjs";

export const api = {
  error: (message: string, error?: Error) => {
    console.error(`[ERROR] ${message}`, error);
    Sentry.captureException(error || new Error(message));
  },
  info: (message: string, data?: never) => {
    console.log(`[INFO] ${message}`, data);
    Sentry.captureMessage(message, {
      level: "info",
      extra: data,
    });
  },
};

export default api;
