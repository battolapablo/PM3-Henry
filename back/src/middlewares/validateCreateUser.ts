import { Request, Response, NextFunction } from "express";

export const validateCreateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, birthdate, nDni, username, password } = req.body;

  if (
    !name ||
    typeof name !== "string" ||
    name.trim() === "" ||
    name.length < 4 ||
    name.length > 30
  ) {
    return res.status(400).json({
      message: "Nombre es obligatorio y debe tener entre 4 y 30 caracteres.",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({
      message:
        "Correo electrónico es obligatorio y debe ser una dirección válida.",
    });
  }

  const birthdateRegex = /^\d{4}-\d{2}-\d{2}$/;
  const alternativeBirthdateRegex = /^\d{2}-\d{2}-\d{4}$/;
  const currentDate = new Date();

  if (
    !birthdate ||
    (!birthdateRegex.test(birthdate) &&
      !alternativeBirthdateRegex.test(birthdate))
  ) {
    return res.status(400).json({
      message: "Fecha de nacimiento es incorrecta",
    });
  }

  let birthdateObj;
  if (alternativeBirthdateRegex.test(birthdate)) {
    const [day, month, year] = birthdate.split("-");
    birthdateObj = new Date(`${year}-${month}-${day}`);
  } else {
    birthdateObj = new Date(birthdate);
  }

  let age = currentDate.getFullYear() - birthdateObj.getFullYear();
  const monthDifference = currentDate.getMonth() - birthdateObj.getMonth();
  const dayDifference = currentDate.getDate() - birthdateObj.getDate();

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }
  if (age < 18) {
    return res.status(400).json({
      message: "Debes tener al menos 18 años de edad.",
    });
  }
  if (birthdateObj > currentDate) {
    return res.status(400).json({
      message: "La fecha de nacimiento no puede ser mayor a la fecha actual.",
    });
  }

  if (
    !nDni ||
    isNaN(nDni) ||
    nDni.toString().length < 7 ||
    nDni.toString().length > 15
  ) {
    return res.status(400).json({
      message: "DNI es obligatorio y debe tener entre 7 y 15 caracteres.",
    });
  }

  if (
    !username ||
    typeof username !== "string" ||
    username.trim() === "" ||
    username.length < 3 ||
    username.length > 30 ||
    /[^a-zA-Z0-9]/.test(username)
  ) {
    return res.status(400).json({
      message:
        "Nombre de usuario es obligatorio y solo puede contener letras y números",
    });
  }
  if (
    !password ||
    typeof password !== "string" ||
    password.length < 4 ||
    password.length > 20 ||
    !/[a-z]/.test(password) ||
    !/[0-9]/.test(password)
  ) {
    return res.status(400).json({
      message:
        "Contraseña es obligatoria, debe tener entre 4 y 20 caracteres y debe incluir al menos una letra y un número",
    });
  }

  next();
};
