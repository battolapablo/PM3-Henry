import { AppDataSource } from "../config/data-source";
import { CreateUserDto } from "../dto/UserDto";
import { User } from "../entities/User";
import UserRepository from "../repositories/UserRepository";
import {
  createCredentialService,
  verifyCredentialService,
} from "./credentialService";
import { generateConfirmationToken, sendConfirmationEmail } from "./mailConfirmationService";


export const getAllUsersService = async (): Promise<User[]> => {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();

  try {
    await queryRunner.startTransaction();

    const users = await queryRunner.manager.find(User, {
      relations: {
        appointment: true
      },
    });

    if (!users || users.length === 0) {
      throw new Error("No se encontraron usuarios");
    }

    await queryRunner.commitTransaction();
    return users;
  } catch (error) {
    await queryRunner.rollbackTransaction();
    console.error("Error al buscar los usuarios:", error);
    throw new Error("No se pudo obtener los usuarios. Inténtelo nuevamente.");
  } finally {
    await queryRunner.release();
  }
};

export const createUserService = async (
  userData: CreateUserDto
): Promise<User> => {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();

  if (
    !userData.name ||
    !userData.email ||
    !userData.password ||
    !userData.birthdate ||
    !userData.nDni ||
    !userData.username
  ) {
    throw new Error("Nombre, correo electrónico y contraseña son requeridos.");
  }

  try {
    await queryRunner.startTransaction();

    const newCredential = await createCredentialService(
      userData.username,
      userData.password
    );
    const newUserData: User = {
      name: userData.name,
      email: userData.email,
      birthdate: userData.birthdate,
      nDni: userData.nDni,
      credentials: newCredential,
      confirmed: false
    };
    

    const user = UserRepository.create(newUserData);
    const result = await UserRepository.save(user);

    const token = generateConfirmationToken(String(result.id));
    await sendConfirmationEmail(userData.email, token);

    await queryRunner.commitTransaction();

    return result;
  } catch (error) {
    console.log("Error al crear usuario, faltan datos o alguno de ellos son incorrectos");
    await queryRunner.rollbackTransaction();
    throw new Error("Error al crear usuario. Inténtelo nuevamente.");
  } finally {
    await queryRunner.release();
  }
};

export const getUserByIdService = async (id: number): Promise<User | null> => {
  if (!id || isNaN(id)) {
    throw new Error(`El ID proporcionado no es válido: ${id}`);
  }

  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();

  try {
    await queryRunner.startTransaction();

    const user = await UserRepository.findOne({ where: { id } });

    await queryRunner.commitTransaction();
    return user || null;
  } catch (error) {
    console.error(`Error al obtener el usuario con ID: ${id}.`, error);
    await queryRunner.rollbackTransaction();
    throw new Error(`No se pudo obtener el usuario. Inténtelo nuevamente.`);
  } finally {
    await queryRunner.release();
  }
};

export const loginUserService = async (
  username: string,
  password: string
): Promise<{ login: boolean; user?: User }> => {
  try {
    const credential = await verifyCredentialService(username, password);

    if (!credential) {
      return { login: false };
    }

    const user = await UserRepository.findOne({
      where: { credentials: { id: credential.id } },
      relations: ["credentials"],
    });

    if (!user || !user.confirmed) {
      return { login: false };
    }

    return {
      login: true,
      user: user,
    };
  } catch (error) {
    throw new Error("Error al intentar iniciar sesión");
  }
};



export const confirmUserService = async (userId: string) => {
  const numericUserId = Number(userId);

  if (isNaN(numericUserId)) {
    throw new Error("ID de usuario inválido");
  }

  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();

  try {
    await queryRunner.startTransaction();

    const user = await UserRepository.findOne({ where: { id: numericUserId } });

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    if (user.confirmed) {
      throw new Error("La cuenta ya está confirmada");
    }

    user.confirmed = true;
    const updatedUser = await UserRepository.save(user);

    await UserRepository.save(updatedUser);

    await queryRunner.commitTransaction();
  } catch (error) {
    await queryRunner.rollbackTransaction();
    console.error("Error al confirmar usuario:", error);
    throw new Error("Error al confirmar usuario. Inténtelo nuevamente.");
  } finally {
    await queryRunner.release();
  }
};
