export function article(articlesList, miHTML) {
    miHTML += `
    <h1>Lista de Articulos por bodega</h1>
    <div class="container">`

    articlesList.forEach(item => {
    miHTML += `
        <div>
            <h2>Nombre de la bodega: ${item._id.name}</h2>
            <h3>Codigo de la bodega: ${item._id.code}</h3>
            <h3>Articulos:</h3>
            <table>
                <tr>
                    <th>Codigo</th>
                    <th>Nombre</th>
                    <th>Descripcion</th>
                    <th>Categoria</th>
                </tr>`

    item.articles.forEach(article => {
        miHTML += `
                <tr>
                    <th>${article.code}</th>
                    <td>${article.name}</td>
                    <td>${article.description}</td>
                    <td>${article.category.name}</td>
                </tr>`
        })
        
    miHTML += `
            </table>
        </div>
    </div>`
    })

    return miHTML
}