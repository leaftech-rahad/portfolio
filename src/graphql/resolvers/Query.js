import context from "../../prisma/context.js";

const Query = {
  allUsers: (parent, args, { req }) => {
    return context.prisma.user.findMany();
  },
  findUser: (parent, { input }, { req }) => {
    const { username, email } = input;
    return context.prisma.user.findUnique({
      where: {
        username: username,
        email: email,
      },
    });
  },
  allPosts: (parent, args, { req }) => {
    return context.prisma.post.findMany();
  },
  findPost: (parent, { input }, { req }) => {
    const { title, username } = input;
    return context.prisma.post.findMany({
      where: {
        username: username,
        title: title,
      },
    });
  },
};
export { Query };
