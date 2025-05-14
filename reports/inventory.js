export function inventory(inventoryList, miHTML) {
    miHTML += `
    <h1>Lista de Inventario por Fecha</h1>
    <div class="container">
        <table>
            <tr>
                <th>Fecha</th>
                <th>Tipo-movimiento</th>
                <th>Codigo-Categoria</th>
                <th>Nombre-Categoria</th>
                <th>Codigo-producto</th>
                <th>Nombre-producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
            </tr>`

    inventoryList.forEach(item => {
    miHTML += `
            <tr>
                <th>${item.date.toLocaleString()}</th>
                <td>${item.article.category.code}</td>
                <td>${item.article.category.name}</td>
                <td>${item.movement}</td>
                <td>${item.article.code}</td>
                <td>${item.article.name}</td>
                <td>${item.quantity}</td>
                <td>${item.price}</td>
            </tr>`
    });

    miHTML += `
        </table>
    </div>`

    return miHTML
}