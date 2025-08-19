import bcrypt from "bcryptjs";
import jwt, {
  type Secret,
  type SignOptions,
  type JwtPayload as TokenPayload,
} from "jsonwebtoken";

type JwtPayload = {
  sub: string;
  iat?: number;
  exp?: number;
};

export function getEnvOrThrow(name: string): string {
  const value = process.env[name];
  console.log(name, value);
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export async function verifyCredentials(
  username: string,
  password: string
): Promise<boolean> {
  const usernameHash =
    "$2a$10$GFd0N7F6zzoop14Wa4qhCOcjECUxXmUvlUtKixkb4n3aBZY2FCdtW";
  const passwordHash =
    "$2a$10$7fbkzmEaiqGB5oHmkUbpnOp.ag1HFRwhbv3UxRnXLAwRZs38adl9m";

  const isUserValid = await bcrypt.compare(username, usernameHash);
  if (!isUserValid) return false;

  const isPassValid = await bcrypt.compare(password, passwordHash);
  return isPassValid;
}

export function signToken(subject: string, expiresIn: string = "1d"): string {
  const secret = "IDKWHATTHEKEYIS";
  return jwt.sign(
    { sub: subject } as JwtPayload,
    secret as Secret,
    { expiresIn } as SignOptions
  );
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    const secret = "IDKWHATTHEKEYIS";
    const decoded = jwt.verify(token, secret as Secret);
    if (typeof decoded === "string") return null;
    return decoded as TokenPayload;
  } catch (_err) {
    return null;
  }
}

export function getAuthCookieName(): string {
  return "auth-token";
}
