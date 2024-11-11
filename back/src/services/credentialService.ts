import CredentialRepository from "../repositories/CredentialRepository";
import { ICredential } from "../interfaces/ICredential";
import { Credential } from "../entities/Credential";

export const createCredentialService = async (
  username: string,
  password: string
): Promise<Credential> => {
  try {
    const newCredential = CredentialRepository.create({ username, password });
    await CredentialRepository.save(newCredential);
    if (newCredential) {
      return newCredential;
    } else {
      throw new Error("Error al crear la credencial");
    }
  } catch (error) {
    console.error("Error al crear la credencial:", error);
    throw new Error("Error al crear la credencial");
  }
};

export const verifyCredentialService = async (
  username: string,
  password: string
): Promise<ICredential | null> => {
  if (typeof username !== "string" || username.trim() === "") {
    throw new Error("Nombre de usuario inválido");
  }
  if (typeof password !== "string" || password.trim() === "") {
    throw new Error("Contraseña inválida");
  }
  try {
    const credential = await CredentialRepository.findOneBy({
      username,
      password,
    });
    if (!credential) {
      throw new Error("Credencial no encontrada");
    }
    return credential;
  } catch (error) {
    console.error("Error al verificar la credencial:");
    throw new Error("Error al verificar la credencial");
  }
};


