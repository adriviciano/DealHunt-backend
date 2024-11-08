import express from 'express';
import { cargarProductosDia } from './dia/dia.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

app.get('/dia/:palabra', async (req, res) => {
  const { palabra } = req.params;
  const productos = await cargarProductosDia(palabra);
  res.json(productos);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
