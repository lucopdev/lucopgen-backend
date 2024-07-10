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
}


export default UserModel;