export const validateName = (name) => {
  if (!name.trim()) {
    return "El nombre es obligatorio";
  }
  return "";
};

export const validateEmail = (email) => {
  if (!email.trim()) {
    return "El email es obligatorio";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    return "El email no es válido";
  }
  return "";
};

export const validateBirthdate = (birthdate) => {
  if (!birthdate) {
    return "La fecha de nacimiento es obligatoria";
  } else {
    const selectedDate = new Date(birthdate);
    const today = new Date();
    const minDate = new Date("1920-01-01");

    if (selectedDate < minDate) {
      return "La fecha de nacimiento no puede ser anterior a 1920";
    } else if (selectedDate > today) {
      return "La fecha de nacimiento no puede ser posterior al día de hoy";
    }
  }
  return "";
};

export const validateDNI = (nDni) => {
  if (!nDni.trim()) {
    return "El DNI es obligatorio";
  } else if (!/^\d+$/.test(nDni)) {
    return "El DNI debe contener solo números";
  }
  return "";
};

export const validateUsername = (username) => {
  if (!username.trim()) {
    return "El usuario es obligatorio";
  }
  return "";
};

export const validatePassword = (password) => {
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
