import { winston } from "@strapi/logger";

const getRequestId = (info: winston.Logform.TransformableInfo): string => {
  const xRequestId = info["x-request-id"];
  const xTraceId = info["x-nft-trace-id"];

  let output = "";

  if (xRequestId && xRequestId !== "-" && xTraceId && xTraceId !== "-") {
    output = JSON.stringify({
      "x-request-id": xRequestId,
      "x-nft-trace-id": xTraceId,
    });
  }

  return output;
};

module.exports = {
  transports: [
    new winston.transports.Console({
      level: "silly",
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.align(),
        winston.format.printf(
          (info) =>
            `[${info.timestamp}] ${info.level}: ${info.message} ${getRequestId(
              info
            )}`
        )
      ),
    }),
  ],
};
