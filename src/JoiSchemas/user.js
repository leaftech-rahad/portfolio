import Joi from "joi";

const name = Joi.string().max(100).required().label("Name");
const email = Joi.string().email().required().label("Email");
const username = Joi.string().max(20).required().label("UserName");
const password = Joi.string()
  .regex(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,30}$/)
  .label("Password");
const phone = Joi.string().max(14).label("Phone");
const address = Joi.string().max(100).label("Address");
const role = Joi.string().max(7).label("Role");

export const signUp = Joi.object().keys({
  name,
  email,
  username,
  password,
  phone,
  address,
  role,
});

export const signIn = Joi.object().keys({
  email,
  password,
});
