import context from "../../prisma/context.js";

export const User = {
  post: (parent, arsg, { req }) => {
    const { ID } = parent;
    return context.prisma.post.findMany({
      where: {
        authorID: ID,
      },
    });
  },
};
