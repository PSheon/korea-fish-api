module.exports = ({ env }) => ({
  documentation: {
    enabled: true,
    config: {
      info: { version: "0.0.1" },
    },
  },
  upload: {
    config: {
      provider: "local",
      sizeLimit: 25 * 1024 * 1024,
    },
  },
  "strapi-blurhash": {
    enabled: true,
    config: {
      regenerateOnUpdate: true,
    },
  },
  "import-export-entries": {
    enabled: true,
    config: {},
  },
  "local-image-sharp": {
    enabled: true,
    config: {
      cacheDir: ".cache/images",
      maxAge: 2592000,
    },
  },
  "config-sync": {
    enabled: true,
    config: {
      syncDir: "config/sync/",
    },
  },
  sentry: {
    enabled: true,
    config: {
      dsn: env("SENTRY_DSN"),
      sendMetadata: true,
    },
  },
  "request-id": {
    enabled: true,
    config: {
      correlationIdHeader: "X-NFT-Trace-Id",
    },
  },
});
