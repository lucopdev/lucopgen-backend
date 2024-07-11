import prisma from '../prisma';

class AccountModel {
  async findAll() {
    return prisma.account.findMany();
  }

  async create(data: { ownerId: number; login: string; password: string; name: string }) {
    return prisma.account.create({
      data: {
        name: data.name,
        login: data.login,
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
