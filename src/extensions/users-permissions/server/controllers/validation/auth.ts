import { yup, validateYupSchema } from "@strapi/utils";

const requestMessageBodySchema = yup.object().shape({
  address: yup.string().required(),
  chain: yup.string().required(),
  networkType: yup.string().required(),
});
export const validateRequestMessageBody = validateYupSchema(
  requestMessageBodySchema
);

const connectBodySchema = yup.object().shape({
  message: yup.string().required(),
  signature: yup.string().required(),
});
export const validateConnectBody = validateYupSchema(connectBodySchema);
