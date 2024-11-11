export const validateLoginUsername = (username) => {
  if (!username.trim()) {
    return "El usuario es obligatorio";
  }
  if (username.trim().length < 4) {
    return "El usuario debe tener al menos 4 caracteres";
  }
  return "";
};

export const validateLoginPassword = (password) => {
  if (!password) {
    return "La contraseña es obligatoria";
  } else if (password.length < 6) {
    return "La contraseña debe tener al menos 6 caracteres";
  } else if (!/[a-zA-Z]/.test(password)) {
    return "La contraseña debe contener al menos una letra";
  } else if (!/\d/.test(password)) {
    return "La contraseña debe contener al menos un número";
  }
  return "";
};
