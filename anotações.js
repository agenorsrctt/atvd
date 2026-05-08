if (produtos.length === 2) {

    /* função de calcudo reduce */
    function calcTotal(array, propriedade) {
        return array.reduce((total, atual) => total += atual[propriedade], 0)
    }

    const precoTotal = calcTotal(produtos, "preco");
    const qntTotal = calcTotal(produtos, "quantidade");

    const trTotal = document.createElement("tr");
    const trTotalValores = document.createElement("tr");

    trTotal.innerHTML = `
        <tr> 
            <th>Total de Produto</th> 
            <th>Preço Total</th> 
            <th>Quantidade Total</th> 
        </tr>
    `;


    trTotalValores.innerHTML = `
        <tr> 
            <td>${produtos.length}</td> 
            <td>${precoTotal}</td> 
            <td>${qntTotal}</td> 
        </tr>
    `;

    console.log("Valor total do preço", precoTotal)
    console.log("Valor total da quantidade", qntTotal)

}