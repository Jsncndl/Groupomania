export const validateMail = (mail: string) => {
  if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(mail)) {
    return true;
  } else {
    return false;
  }
};

export const validateName = (name: string) => {
  if (
    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(
      name
    )
  ) {
    return true;
  } else {
    return false;
  }
};
