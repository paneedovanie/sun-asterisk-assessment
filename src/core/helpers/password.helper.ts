import bcrypt from "bcrypt";

const saltRounds = 10;

const salt = bcrypt.genSaltSync(saltRounds);

export const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, salt);
};

export const checkPassword = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
};
