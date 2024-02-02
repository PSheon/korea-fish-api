export default [
  "strapi::logger",
  "strapi::errors",
  "strapi::security",
  {
    name: "strapi::cors",
    config: {
      origin: [
        (process.env.FRONTEND_URL as string) || "http://localhost:8080",
        (process.env.BACKEND_URL as string) || "http://localhost:1337",
      ],
      headers: "*",
    },
  },
  {
    name: "strapi::poweredBy",
    config: { poweredBy: "PSheon <github.com/PSheon>" },
  },
  "strapi::query",
  { name: "strapi::body", config: { jsonLimit: "25mb" } },
  "strapi::session",
  {
    name: "strapi::favicon",
    config: {
      path: "/public/favicon.ico",
    },
  },
  "strapi::public",
  "plugin::request-id.request-id",
];
