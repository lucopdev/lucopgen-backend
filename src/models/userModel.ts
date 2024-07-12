import prisma from '../prisma';

class UserModel {
  async findAll() {
    return prisma.user.findMany({
      include: {
        accounts: true,
      },
    });
  }

  async create(data: { name: string; email: string; phone: string; password: string }) {
    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
      },
    });
  }

  async updateUser(id: number, data: { name: string; phone: string; email: string; password: string }) {
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
        phone: data.phone,
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
