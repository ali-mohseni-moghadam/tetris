import { hash } from "bcrypt";

async function hashPassword(password: string) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export { hashPassword };
