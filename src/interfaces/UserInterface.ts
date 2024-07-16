export default interface AccountInterface {
  id: number;
  name: string;
  login: string;
  password: string;
  ownerId: number;
}

export default interface UserInterface {
  id: number;
  name: string;
  email: string;
  phone: string;
  accounts: AccountInterface[];
}
