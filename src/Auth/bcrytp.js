import bcrypt from "bcryptjs";
import { AuthenticationError } from "apollo-server-core";
export const encrypt = async (value) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(value, salt);
  if (hash === value)
    throw new AuthenticationError("Server error. Please try again.");

  return hash;
};
