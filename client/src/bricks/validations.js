export const nameValidation = (name) => {
  if (name.trim() === '') {
    return `Jméno interpreta je povinné`;
  }
  if (name.trim().length < 3) {
    return `Jméno interpreta musí mít alespoň tři znaky`;
  }
  return null;
};

export const titleValidation = (title) => {
  if (title.trim() === '') {
    return `Název videa je povinný`;
  }
  if (title.trim().length < 3) {
    return `Název videa musí mít alespoň tři znaky`;
  }
  return null;
};

export const durationValidation = (duration) => {
  if (/^[0-9]{9}$/.test(duration)) {
    return null;
  }
  if (duration === '') {
    return 'Délka videa musí být vyplněna';
  }
  if (duration.length < 9) {
    return `Telefonní číslo musí mít alespoň 9 číslic`;
  }
  return 'Vložte prosím trvání videa s tečkou';
};

export const descriptionValidation = (value) => {
  if (value.trim() === '') {
    return 'Musí být vyplněno';
  }
  if (value.length > 200) {
    return `Maximální délka popisu je 200 znaků.`;
  }
  return null;
};

export const requiredValidation = (value) => {
  if (value.trim() === '') {
    return 'Musí být vyplněno';
  }
  return null;
};

export const linkValidation = (link) => {
  if (/^https[a-zA-Z0-9._-]+\.[a-zA-z]{2,4}$/.test(link)) {
    return null;
  }
  if (link.trim() === '') {
    return 'Url musí být vyplněna';
  }
  return 'Vložte prosím url ve správném tvaru';
};
