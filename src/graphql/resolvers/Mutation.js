import { encrypt } from "../../Auth/bcrytp.js";
import context from "../../prisma/context.js";
import { signOut, attemptSignIn } from "../../Auth/Auth.js";
import { signUp, signIn } from "../../JoiSchemas/user.js";

export const Mutation = {
  me: (parent, args, { req }) => {
    const { userId } = req.session;
    return context.prisma.user.findUnique({
      where: { ID: userId },
    });
  },

  signIn: async (parent, { input }, { req }) => {
    const { value, error, warning } = signIn.validate(input, {
      abortEarly: false,
    });
    if (error) return error;

    const { email, password } = input;

    //user authentication
    const user = await attemptSignIn(email, password);

    //saving user to sesion as userId
    if (user) req.session.userId = user.ID;

    //returning the signedIn user instance
    return user;
  },

  signOut: async (parent, args, { req, res }) => {
    await signOut(req, res);
    return true;
  },

  createUser: async (parent, { input }, { req }) => {
    //joi validation
    const { value, error, warning } = signUp.validate(input, {
      abortEarly: false,
    });
    if (error) return error;

    //destructure from input
    const { name, email, username, phone, address, role, password } = input;

    const createAndSignIn = await context.prisma.user.create({
      data: {
        name: name,
        email: email,
        username: username,
        phone: phone,
        address: address,
        role: role,
        password: (await encrypt(password)).toString(),
      },
    });

    const createdUser = await context.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    req.session.userId = createdUser.ID;

    return createAndSignIn;
  },
  createPost: async (parent, { input }, { req }) => {
    const { title, content } = input;
    const { userId } = req.session;
    const queriedUser = await context.prisma.user.findUnique({
      where: {
        ID: userId,
      },
    });
    return context.prisma.post.create({
      data: {
        title: title,
        content: content,
        username: queriedUser.username,
      },
    });
  },
  deleteUser: async (parent, { input }, { req, res }) => {
    const { userId } = req.session;
    await context.prisma.user.update({
      where: {
        ID: userId,
      },
      data: {
        post: {
          set: [],
        },
      },
      include: {
        post: true,
      },
    });

    await signOut(req, res);

    await context.prisma.user.delete({
      where: {
        ID: userId,
      },
    });
    return true;
  },
  deletePost: async (parent, { input }, { req }) => {
    const { userId } = req.session;
    await context.prisma.post.deleteMany({
      where: {
        authorID: userId,
      },
    });
    return true;
  },
};
