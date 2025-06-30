import Joi from "joi";

export const successModel = Joi.object({
  success: Joi.boolean()
    .required()
    .description("Indicates if the operation was successful."),
}).label("success");

export const emailAndPasswordModel = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .description("The user's email address."),
  password: Joi.string().required().description("The user's password."),
}).label("emailAndPassword");

export const userModel = Joi.object({
  _id: Joi.string(),
  active: Joi.date().iso(),
  created: Joi.date().iso(),
  email: Joi.string().email(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  role: Joi.string().valid("admin", "user"),
  requiresPasswordReset: Joi.boolean(),
}).label("user");
