export const baseUrl = process.env.NODE_ENV === "development" || process.env["VERCEL_URL"] == null
  ? new URL("http://localhost:3000")
  : new URL(`https://${process.env["VERCEL_URL"]}`);
