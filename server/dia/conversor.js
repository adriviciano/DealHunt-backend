import { writeFile, readFileSync } from 'fs';

// Cargar el archivo productos_dia.json de manera síncrona
const productos = JSON.parse(readFileSync('./server/dia/productos_dia.json', 'utf-8'));

// Función para modificar los precios por unidad
productos.forEach(producto => {
  if (producto.precio_por_unidad.includes('/100 ML.')) {
    // Convertir de €/100 ML a €/L
    producto.precio_por_unidad = producto.precio_por_unidad.replace(/\d+,\d+/g, match => {
      return (parseFloat(match.replace(',', '.')) * 10).toFixed(2).replace('.', ',');
    }).replace('/100 ML.', '/L');
  } else if (producto.precio_por_unidad.includes('/100 GR.')) {
    // Convertir de €/100 GR a €/kg
    producto.precio_por_unidad = producto.precio_por_unidad.replace(/\d+,\d+/g, match => {
      return (parseFloat(match.replace(',', '.')) * 10).toFixed(2).replace('.', ',');
    }).replace('/100 GR.', '/kg');
  }
});

// Guardar los cambios en un nuevo archivo
writeFile('productos_dia_modificado.json', JSON.stringify(productos, null, 2), (err) => {
  if (err) {
    console.error('Error al guardar el archivo:', err);
  } else {
    console.log('Archivo guardado exitosamente como productos_dia_modificado.json');
  }
});
