/**
 * Auth.js controller
 *
 * @description: A set of functions called "actions" for managing `Auth`.
 */

import utils from "@strapi/utils";

import Moralis from "moralis";
import _ from "lodash";

import { signatureConfig } from "./constant/auth";
import {
  validateRequestMessageBody,
  validateConnectBody,
} from "./validation/auth";

import { IAdvancedSettings } from "../../types/strapiServerTypes";

const { sanitize } = utils;
const { ApplicationError } = utils.errors;

const sanitizeUser = (user, ctx) => {
  const { auth } = ctx.state;
  const userSchema = strapi.getModel("plugin::users-permissions.user");

  return sanitize.contentAPI.output(user, userSchema, { auth });
};

export const requestMessage = async (ctx) => {
  const body = ctx.request.body;
  await validateRequestMessageBody(body, "");

  const { address, chain, networkType } = body;

  try {
    const message = await Moralis.Auth.requestMessage({
      address,
      chain,
      networkType,
      ...signatureConfig,
    });

    return ctx.send(message, 201);
  } catch (err) {
    strapi.plugin("sentry").service("sentry").sendError(err);
    throw new ApplicationError("Unable to request message");
  }
};

export const connectWallet = async (ctx) => {
  const body = ctx.request.body;
  await validateConnectBody(body, "");

  const { message, signature } = body;

  const { address: connectAddress } = (
    await Moralis.Auth.verify({ message, signature, networkType: "evm" })
  ).raw;
  const formattedConnectAddress = connectAddress.toLowerCase();

  try {
    const existedUserEntities = await strapi.entityService.findMany(
      "plugin::users-permissions.user",
      {
        filters: { address: formattedConnectAddress },
        populate: ["role"],
      }
    );

    if (existedUserEntities.length) {
      const existedUserBase = existedUserEntities[0];
      const accessToken = await strapi
        .plugin("users-permissions")
        .service("jwt")
        .issue({ id: existedUserBase.id });

      const userData = await sanitizeUser(existedUserBase, ctx);

      return ctx.send({ accessToken, userData }, 201);
    } else {
      const pluginStore = await strapi.store({
        type: "plugin",
        name: "users-permissions",
      });

      const settings = (await pluginStore.get({
        key: "advanced",
      })) as IAdvancedSettings;

      const role = await strapi
        .query("plugin::users-permissions.role")
        .findOne({ where: { type: settings.default_role } });

      if (!role) {
        throw new ApplicationError("Impossible to find the default role");
      }

      const newUserBase = await strapi.entityService.create(
        "plugin::users-permissions.user",
        {
          data: {
            username: connectAddress,
            address: formattedConnectAddress,
            provider: "local",
            conformed: true,
            role: role.id,
          },
          populate: ["role"],
        }
      );

      const accessToken = await strapi
        .plugin("users-permissions")
        .service("jwt")
        .issue({
          id: newUserBase.id,
        });
      const userData = await sanitizeUser(newUserBase, ctx);

      return ctx.send({ accessToken, userData }, 201);
    }
  } catch (err) {
    strapi.plugin("sentry").service("sentry").sendError(err);
    throw new ApplicationError("Unable to connect wallet");
  }
};
