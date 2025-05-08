import express from 'express';
import dotenv from 'dotenv';
import router from '@/routes/Todo.routes';
import authRouter from '@/routes/auth.routes';
import { protegerRuta } from '@/middlewares/auth.middleware';
dotenv.config();

const app = express();
app.use(express.json());

app.use("/api", router);
app.use('/auth', authRouter); 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/perfil', protegerRuta, (req, res) => {
    const usuario = (req as any).usuario;
    res.json({ mensaje: `Hola, ${usuario.email}! Esta ruta está protegida.` });
  });



