import { requestMessage, connectWallet } from "./server/controllers/auth";
// import { update, find, findOne, updateMe } from "./server/controllers/user";
// import userService from "./server/services/user";

export default (plugin) => {
  /* Controllers */
  plugin.controllers.auth.requestMessage = requestMessage;
  plugin.controllers.auth.connectWallet = connectWallet;

  /* Services */
  // plugin.services.user = userService;

  /* Routes */
  plugin.routes["content-api"].routes.push({
    method: "POST",
    path: "/auth/request-message",
    handler: "auth.requestMessage",
    config: {
      middlewares: ["plugin::users-permissions.rateLimit"],
      policies: [],
      prefix: "",
    },
  });
  plugin.routes["content-api"].routes.push({
    method: "POST",
    path: "/auth/connect-wallet",
    handler: "auth.connectWallet",
    config: {
      middlewares: ["plugin::users-permissions.rateLimit"],
      policies: [],
      prefix: "",
    },
  });

  return plugin;
};
