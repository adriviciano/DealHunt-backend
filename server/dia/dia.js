// dia.js

import path from 'path';
import fs from 'fs';


// Función para buscar productos por nombre
export function buscarProductosPorNombre(productos, palabra) {
    const palabraLower = palabra.toLowerCase();
    return productos.filter(producto => 
        producto.nombre.toLowerCase().includes(palabraLower)
    );
}


// Cargar el JSON desde el archivo
export async function cargarProductosDia(palabraBuscada) {
    try {
        const filePath = path.join(process.cwd(), 'server/dia/productos_dia.json'); // Obtén la ruta absoluta
        const productosJson = fs.readFileSync(filePath, 'utf-8'); // Lee el archivo JSON
        const productos = JSON.parse(productosJson); // Parsear el JSON

        return buscarProductosPorNombre(productos, palabraBuscada);

    } catch (err) {
        console.error('Error:', err);
        return []; // Devuelve un arreglo vacío en caso de error
    }
}
