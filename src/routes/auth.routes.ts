import { Router } from 'express';
import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { generateToken } from '@/utils/jwt';

const authRouter = Router();

// Usuario de prueba en memoria
const usuarios: { [email: string]: { email: string; passwordHash: string } } = {};

authRouter.post('/register', async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    if (usuarios[email]) {
      return void  res.status(400).json({ mensaje: 'El usuario ya existe' });
    }
  
    const passwordHash = await bcrypt.hash(password, 10);
    usuarios[email] = { email, passwordHash };
  
    return void res.status(201).json({ mensaje: 'Usuario registrado con éxito' });
  });

  authRouter.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const usuario = usuarios[email];

  if (!usuario || !(await bcrypt.compare(password, usuario.passwordHash))) {
    return void res.status(401).json({ mensaje: 'Credenciales inválidas' });
  }

  const token = generateToken({ email });
  return void res.status(200).json({ mensaje: 'Token generado', token });
});

export default authRouter;
