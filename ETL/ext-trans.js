import { readFile } from 'fs/promises';
import { double } from 'webidl-conversions';

export async function leerCSV(file, filePath) {
    try {
        const data = await readFile(filePath, 'utf8');
        const lines = data.trim().split('\n');

        const rows = lines.slice(1).map(line => {
            const values = line.split(",");
            if (file === "articles") {
                return {
                    code: values[0],
                    name: values[1],
                    description: values[2],
                    category: {
                        code: values[3],
                        name: values[4],
                        description: values[5],
                        active: values[6] == "si" ? true : false
                    },
                    active: values[7] == "si" ? true : false,
                };
            } else if (file === "inventory") {
                return {
                    date: new Date(values[0]),
                    article: values[1],
                    quantity: Number(values[2]),
                    price: double(values[3]),
                    movement: values[4],
                    warehouse: values[5],
                    description: values[6]
                };
            } else if (file === "warehouses") {
                return {
                    code: values[0],
                    name: values[1],
                    description: values[2],
                    active: values[3] == "si" ? true : false
                };
            }
        })

        return rows;
    } catch (err) {
        console.error('Error leyendo CSV:', err.message);
    }
}