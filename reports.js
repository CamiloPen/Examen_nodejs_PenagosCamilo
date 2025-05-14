import { writeFile } from 'fs/promises'
import { client, main } from "./helpers/db.js";
import { Inventory } from "./Crud/inventory.js";
import { style, article, inventory } from './reports/index.js';

const db = await main();
const inventorydb = new Inventory(db)

const inventoryList = await inventorydb.inventoryList("01/01/2025", "04/01/2025")
const articlesList = await inventorydb.articlesList()


async function generarHTML(nombreArchivo, contenidoHTML) {
    try {
        await writeFile(nombreArchivo, contenidoHTML, 'utf8');
        console.log(`El archivo "${nombreArchivo}" ha sido creado exitosamente.`);
    } catch (error) {
        console.error('Ocurrió un error al escribir el archivo:', error);
    }
}

let miHTML = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Cursos por fecha</title>
</head>
<body>`

miHTML = inventory(inventoryList, miHTML)

miHTML = article(articlesList, miHTML)

miHTML += `
</body>
</html>`

generarHTML("index.html", miHTML);
generarHTML("style.css", style);

await client.close();