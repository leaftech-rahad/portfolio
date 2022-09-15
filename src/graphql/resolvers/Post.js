import context from "../../prisma/context.js";

export const Post = {
  user: (parent, args, { req }) => {
    const { authorID } = parent;
    return context.prisma.user.findUnique({
      where: {
        ID: authorID,
      },
    });
  },
};
