"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
router.get('/mensajes', (req, res) => {
    res.json({
        ok: true,
        mensaje: "ok"
    });
});
router.post('/mensajes', (req, res) => {
    const body = req.body.cuerpo;
    const de = req.body.de;
    res.json({
        ok: true,
        body,
        de
    });
});
router.post('/mensajes/:id', (req, res) => {
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
exports.default = router;
