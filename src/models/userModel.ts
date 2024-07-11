import prisma from '../prisma';

class UserModel {
  async findAll() {
    return prisma.user.findMany({
      include: {
        accounts: true,
      },
    });
  }

  async create(data: { email: string; password: string; name: string }) {
    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });
  }

  async updateUser(id: number, data: { email: string; password: string; name: string }) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return prisma.user.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });
  }

  async deleteUser(id: number) {
    return prisma.user.delete({
      where: {
        id,
      },
      include: {
        accounts: true,
      },
    });
  }
}

export default UserModel;
