exports.Post = {
  user: (parent, args, context) => {
    let { username } = parent;
    if (username === null) {
      username = "undefined";
    }
    return context.prisma.user.findUnique({
      where: {
        username: username,
      },
    });
  },
};
