exports.Mutation = {
  createUser: (parent, { input }, context) => {
    const { name, email, username, phone, address, role, password } = input;
    return context.prisma.user.create({
      data: {
        name: name,
        email: email,
        username: username,
        phone: phone,
        address: address,
        role: role,
        password: password,
      },
    });
  },
  createPost: (arent, { input }, context) => {
    const { title, username, content } = input;
    return context.prisma.post.create({
      data: {
        title: title,
        content: content,
        username: username,
      },
    });
  },
  deleteUser: async (parent, { input }, context) => {
    const { username } = input;
    console.log(username);
    await context.prisma.user.update({
      where: {
        username: username,
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

    await context.prisma.user.delete({
      where: {
        username: username,
      },
    });
    return true;
  },
  deletePost: async (parent, { input }, context) => {
    const { ID, username } = input;
    await context.prisma.post.deleteMany({
      where: {
        ID: ID,
        username: username,
      },
    });
    return true;
  },
};
