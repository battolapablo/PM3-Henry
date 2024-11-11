import UserDto from "../dto/UserDto";
import IUser from "../interfaces/IUser";
import { userModel } from "../config/data-source";
import { User } from "../entities/User";

let user: IUser[] = [
  {
    id: 1,
    name: "Pablo",
    email: "pablo@example.com",
    active: true,
  },
];

let id: number = 2;

export const createUserService = async (userData: UserDto) => {
  const user = await userModel.create(userData);
  const resultado = await userModel.save(user);
  return user;
};

export const getUserService = async (): Promise<User[]> => {
  const users = await userModel.find();
  return users;
};

export const getUserByIdService = async (id: number): Promise<User | null> => {
  const user = await userModel.findOneBy({ id });
  return user;
};

export const deleteUserService = async (id: Number): Promise<void> => {
  user = user.filter((user: IUser) => {
    return user.id !== id;
  });
};
