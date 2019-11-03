import {Router, Request, Response} from 'express';
import Server from '../classes/server';
import { Socket } from 'dgram';
import { usuariosConectados } from '../sockets/socket';
const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {
  res.json({
    ok: true,
    mensaje:"ok"
  });
});

router.post('/mensajes', (req: Request, res: Response) => {
  const body = req.body.cuerpo;
  const de = req.body.de;
  
  const payload = {  de, body }
  const server = Server.instance;
  server.io.emit('nuevo-mensaje',payload);
  res.json({
    ok: true,
    body,
    de
  });
});

router.post('/mensajes/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  const body = req.body.cuerpo;
  const de = req.body.de;

  const payload = {  de, body }
  const server = Server.instance;

  server.io.in(id).emit('mensaje-privado',payload);

  res.json({
    ok: true,
    body,
    de,
    id
  });
});

router.post('/usuarios', (req: Request, res: Response) => {
  const server = Server.instance;
  server.io.clients((err: any,clientes: string[]) => {
    if(err)
    {
      res.json({ok:false,err})
    }
    res.json({ok:true,clientes})
  });
});


router.post('/usuarios/detalle', (req: Request, res: Response) => {
  const server = Server.instance;
  server.io.clients((err: any,clientes: string[]) => {
    if(err)
    {
      res.json({ok:false,err})
    }
    res.json({ok:true,clientes: usuariosConectados.getLista()})
  });
});
export default router;