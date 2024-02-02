/**
 * root-signer controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::root-signer.root-signer",
  ({ strapi }) => ({})
);
