import prisma from '../prisma';

class AccountModel {
  async findAll() {
    return prisma.account.findMany();
  }

  async create(data: { ownerId: number; email: string; password: string; name: string }) {
    return prisma.account.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        owner: {
          connect: {
            id: data.ownerId,
          },
        },
      },
    });
  }
}

export default AccountModel;
