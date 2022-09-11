exports.Query = {
  allUsers: (parent, args, context) => {
    return context.prisma.user.findMany();
  },
  findUser: (parent, { input }, context) => {
    const { username, email } = input;
    return context.prisma.user.findUnique({
      where: {
        username: username,
        email: email,
      },
    });
  },
  allPosts: (parent, args, context) => {
    return context.prisma.post.findMany();
  },
  findPost: (parent, { input }, context) => {
    const { title, username } = input;
    return context.prisma.post.findMany({
      where: {
        username: username,
        title: title,
      },
    });
  },
};
