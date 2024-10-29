import Joi from "joi";

export const ConfigModuleValidationSchema =Joi.object({
    SERVER_PORT:Joi.number().default(3000),
    DB_HOST:Joi.string(),
    DB_PORT:Joi.number().default(3306),
    DB_USERNAME:Joi.string(),
    DB_PASSWORD:Joi.string(),
    DB_NAME:Joi.string(),
    DB_SYNC:Joi.boolean().default(true),
    PASSWORD_HASH_ROUND:Joi.number().required().default(10),
    JWT_SECRET:Joi.string().required(),
  });