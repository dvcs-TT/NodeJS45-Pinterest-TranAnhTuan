import { Secret } from "jsonwebtoken";

const generalConstant = {
  SECRET_COOKIE: "cookie_token",
  passRegExp: /^(?=.*\d)(?=.*[A-Z])(?=.*[@$!%*#?&])([a-zA-Z0-9@$!%*#?&]){8,}$/,
};

// jwt config
export const secretCookie: Secret = process.env.SECRET_COOKIE!;
export const secretKey: Secret = process.env.SECRET_KEY!;

export default generalConstant;
