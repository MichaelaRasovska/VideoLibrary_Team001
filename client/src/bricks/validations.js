export const nameValidation = (name) => {
  if (name.trim() === '') {
    return `Jméno interpreta je povinné`;
  }
  if (name.trim().length < 2) {
    return `Jméno interpreta musí mít alespoň dva znaky`;
  }
  return null;
};

export const titleValidation = (title) => {
  if (title.trim() === '') {
    return `Název videa je povinný`;
  }
  if (title.trim().length < 2) {
    return `Název videa musí mít alespoň dva znaky`;
  }
  return null;
};

export const durationValidation = (duration) => {
  if (/^[0-59]/.test(duration)) {
    return null;
  }
  if (duration === '') {
    return 'Délka videa musí být vyplněna';
  }
  if (duration.length < 1) {
    return `Délka videa musí být minimálně 1 sekunda.`;
  }
  return 'Vložte prosím trvání videa.';
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

export const videoLinkValidation = (link) => {
  return linkValidation(link, 'video');
};

export const pictureLinkValidation = (link) => {
  return linkValidation(link, 'obrázek');
};

const linkValidation = (link, fieldName) => {
  if (/^(https|http)?:\/\/.*\.(com|cz|org)\/[a-zA-Z0-9]+/.test(link)) {
    return null;
  }
  if (link.trim() === '') {
    return `Odkaz na ${fieldName} je povinný`;
  }
  return `Vložte prosím URL odkazující přímo na ${fieldName}. URL musí obsahovat "http:// nebo https://".`;
};

export const requiredValidation = (value) => {
  if (value.trim() === '') {
    return 'Musí být vyplněno';
  }
  return null;
};
