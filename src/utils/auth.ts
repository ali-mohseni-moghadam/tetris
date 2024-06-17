import { compare, hash } from "bcrypt";
import { type JwtPayload, verify } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
  email: string;
}

async function hashPassword(password: string) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

async function verifyPassword(password: string, hashPass: string) {
  const isValid = await compare(password, hashPass);

  return isValid;
}

function verifyToken(token: string, secretKey: string) {
  try {
    const result = verify(token, secretKey) as JwtPayload;

    if (
      result &&
      typeof result !== "string" &&
      (result as CustomJwtPayload).email
    ) {
      return {
        email: (result as CustomJwtPayload).email,
      };
    } else {
      throw new Error("Invalid token payload");
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

export { hashPassword, verifyPassword, verifyToken };
