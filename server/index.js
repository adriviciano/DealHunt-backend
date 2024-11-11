import express from 'express';
import fs from 'fs';
import https from 'https';
import { cargarProductosDia } from './dia/dia.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

// Lee el certificado SSL y la clave privada
const sslOptions = {
  key: fs.readFileSync('/home/orangepi/ssl/server.key'),
  cert: fs.readFileSync('/home/orangepi/ssl/server.crt')
};

app.use(cors());

app.get('/dia/:palabra', async (req, res) => {
  const { palabra } = req.params;
  const productos = await cargarProductosDia(palabra);
  res.json(productos);
});

// Configura el servidor HTTPS
https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`Servidor HTTPS corriendo en https://localhost:${PORT}`);
});

