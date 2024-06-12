import { compare, hash } from "bcrypt";

async function hashPassword(password: string) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

async function verifyPassword(password: string, hashPass: string) {
  const isValid = await compare(password, hashPass);

  return isValid;
}

export { hashPassword, verifyPassword };
