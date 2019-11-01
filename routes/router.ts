import {Router, Request, Response} from 'express';
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
  res.json({
    ok: true,
    body,
    de,
    id
  });
});

export default router;