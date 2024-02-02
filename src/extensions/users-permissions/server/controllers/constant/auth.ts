export const signatureConfig = {
  domain: new URL(process.env.FRONTEND_URL).hostname,
  statement: "Please sign this message to confirm your identity.",
  uri: process.env.FRONTEND_URL,
  timeout: 60,
};
