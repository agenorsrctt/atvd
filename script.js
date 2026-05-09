const form = document.querySelector(".form");
const list = document.querySelector(".list");
const pesquisa = document.querySelector(".pesquisa");

/* Adicionar item a tabela */
form.addEventListener("submit", event => {
    event.preventDefault();

    const novoProduto = {
        produto: event.target.produto.value.toUpperCase(),
        preco: Number(event.target.preco.value),
        quantidade: Number(event.target.quantidade.value)
    }

    if (verificarProdutoExistente(novoProduto, "produto")) {
        if (novoProduto.produto != "" && novoProduto.preco > 0 && novoProduto.quantidade > 0) {
            produtos.push(novoProduto);
            salvarLocalStorage(produtos);
            carregarProdutos();
            if (produtos.length === 1) {
                pesquisarProdutos(produtos);
            }
            form.reset();
        } else {
            alert("Erro ao adicionar, nenhum produto cadastrado!")
        }
    }
})

/* Função para carregar tabela salva no navagegador */
function carregarLocalStorage() {
    const getList = localStorage.getItem("lista");
    if (getList) {
        return JSON.parse(getList);
    } else {
        return [];
    }
}

/* Função para salvar tabela na memoria do navegador */
function salvarLocalStorage(parametro) {
    return localStorage.setItem("lista", JSON.stringify(parametro))
}

/* Variavel global com a lista dos produtos */
const produtos = carregarLocalStorage();

/* Função para percorrer os produtos/criar a tabela/criar botoes */
function carregarProdutos(parametro = produtos) {

    const table = document.createElement("table");

    if (produtos.length === 0) {
        list.innerHTML = "Lista Vazia";
        return
    }

    list.innerHTML = ""

    table.border = "5"
    table.innerHTML = `
                <tr> 
                    <th>
                    Produto
                    <button class="ordenarNome">↑</button>
                    </th> 

                    <th>
                    Preço (R$)
                    <button class="ordenarPreco">↑</button>
                    </th> 

                    <th>
                    Quantidade (UN)
                    <button class="ordenarQuant">↑</button>
                    </th> 

                    <th>Config</th> 
                </tr>
                `;

    /* Adicionando botao de ordenação */

    const ordenarNome = table.querySelector(".ordenarNome");
    const ordenarPreco = table.querySelector(".ordenarPreco");
    const ordenarQuantidade = table.querySelector(".ordenarQuant");

    ordenarNome.addEventListener("click", event => {
        carregarProdutos(
            [...produtos].sort((a, b) =>
                a.produto.localeCompare(b.produto)
            )
        );
    })
    ordenarPreco.addEventListener("click", event => carregarProdutos(ordenarTabela(produtos, "preco")))
    ordenarQuantidade.addEventListener("click", event => carregarProdutos(ordenarTabela(produtos, "quantidade")))

    parametro.forEach((produto) => {

        const indiceReal = produtos.indexOf(produto);

        const tr = document.createElement("tr");

        const editarProduto = document.createElement("button");
        const excluirProduto = document.createElement("button");

        editarProduto.textContent = "Editar";
        excluirProduto.textContent = "Excluir"

        tr.innerHTML = `
                    <td>${produto.produto}</td>
                    <td>R$ ${produto.preco}</td>
                    <td>${produto.quantidade}</td>
                `;

        tr.appendChild(editarProduto);
        tr.appendChild(excluirProduto);

        table.appendChild(tr);

        editarProduto.addEventListener("click", event => {
            const novoNome = prompt("Digite o nome do Produto", produto.produto);
            const novoPreco = prompt("Digite o preço", produto.preco);
            const novaQuantidade = prompt("Digite a quantidade", produto.quantidade);

            if (novoNome != "" && novoPreco > 0 && novaQuantidade > 0) {

                produtos[indiceReal].produto = novoNome.toUpperCase();
                produtos[indiceReal].preco = Number(novoPreco.replace(",", "."));
                produtos[indiceReal].quantidade = Number(novaQuantidade);

                salvarLocalStorage(produtos);
                carregarProdutos();
            } else {
                alert("Erro ao editar, os campos não podem ficar vazios!")
            }
        })

        excluirProduto.addEventListener("click", event => {
            const confirmar = confirm("Deseja excluir o produto?")

            if (confirmar) {
                produtos.splice(indiceReal, 1);
                salvarLocalStorage(produtos);
                alert("Produto Excluido");
                carregarProdutos();
                if (produtos.length === 0) {
                    pesquisa.innerHTML = "";
                }
            } else {
                alert("Resposta não reconhecida, retornando")
            }
        })
    })

    if (produtos.length > 1) {

        /* função de calcudo reduce */
        function calcTotal(array, propriedade) {
            return array.reduce((total, atual) => {
                return total += Number(atual[propriedade]);
            }, 0)

        }

        const precoTotal = produtos.reduce((total, atual) => {
            return total + (atual.preco * atual.quantidade);
        }, 0)
        const qntTotal = calcTotal(produtos, "quantidade");

        const trTotal = document.createElement("tr");
        const trTotalValores = document.createElement("tr");

        trTotal.innerHTML = `
                        <th>Total de Produto</th> 
                        <th>Preço Total (R$)</th> 
                        <th>Quantidade Total (UN)</th> 
                `;


        trTotalValores.innerHTML = `
                        <td>${produtos.length}</td> 
                        <td>R$ ${precoTotal}</td> 
                        <td>${qntTotal}</td> 
                `;

        table.appendChild(trTotal);
        table.appendChild(trTotalValores);
    }

    list.appendChild(table);
}

/* Chamada da função */
carregarProdutos(produtos);

/* Função para pesquisa de produtos */
function pesquisarProdutos(parametro) {

    pesquisa.innerHTML = "";

    const input = document.createElement("input");
    const h3 = document.createElement("h3");

    h3.textContent = "Barra de Pesquisa"
    input.placeholder = "Digite o nome do produto";

    pesquisa.appendChild(h3);
    pesquisa.appendChild(input);

    input.addEventListener("input", event => {

        const busca = event.target.value.toLowerCase();

        const produtosFiltrados = parametro.filter(produto => produto.produto.toLowerCase().includes(busca));

        carregarProdutos(produtosFiltrados);
    });
}

if (produtos.length != 0) {
    pesquisarProdutos(produtos);
}

/* Verificação se já existe o produto no estoque */

function verificarProdutoExistente(parametro, nome) {

    const existente = produtos.some(produto =>
        produto[nome] === parametro[nome]
    );

    if (existente) {
        alert("Produto ja cadastrado!");
        return false;
    }

    return true;
}


/* Ordenar tabela */

function ordenarTabela(produtos, parametro) {
    return [...produtos].sort((a, b) => b[parametro] - a[parametro]);
}