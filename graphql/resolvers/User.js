exports.User = {
  post: (parent, arsg, context) => {
    const { username } = parent;
    return context.prisma.post.findMany({
      where: {
        username: username,
      },
    });
  },
};
