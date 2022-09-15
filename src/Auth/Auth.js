import { AuthenticationError } from "apollo-server-core";
import context from "../prisma/context.js";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
dotenv.config();

const { SESS_NAME } = process.env;
const SignedIn = (req) => req.session.userId;

export const ensureSignedIn = (req) => {
  if (!SignedIn(req)) {
    throw new AuthenticationError("You must be signed in.");
  }
};

export const ensureSignedOut = (req) => {
  if (SignedIn(req)) {
    throw new AuthenticationError("You are already signed in.");
  }
};

export const attemptSignIn = async (email, password) => {
  const message = "Incorrect Email or Password. Please try again.";
  const user = await context.prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    throw new AuthenticationError(message);
  }

  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    throw new AuthenticationError(message);
  }
  return user;
};

export const signOut = (req, res) =>
  new Promise((resolve, reject) => {
    res.clearCookie(SESS_NAME);
    req.session.destroy((err) => {
      if (err) reject(err);

      resolve(true);
    });
  });
