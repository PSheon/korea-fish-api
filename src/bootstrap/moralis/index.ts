/**
 * Moralis Bootstrap
 */

import Moralis from "moralis";

export const moralisBootstrap = async (strapi) => {
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
};
