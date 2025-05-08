import jwt from 'jsonwebtoken';

const JWT = process.env.JWT_SECRET || '';

export const generateToken = (payload: object) => {
  return jwt.sign(payload, JWT, {
    expiresIn: "1h",
  });
};
export const verificarToken = (token: string) => {
  return jwt.verify(token, JWT);
};