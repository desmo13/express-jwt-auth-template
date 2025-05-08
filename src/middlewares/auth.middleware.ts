import { Request, Response, NextFunction } from 'express';
import {verificarToken} from '@/utils/jwt';

export function protegerRuta(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return void  res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verificarToken(token);
    // Puedes adjuntar los datos al request
    (req as any).usuario = decoded;
    next();
  } catch (err) {
    return void res.status(403).json({ mensaje: 'Token inválido o expirado' });
  }
}
