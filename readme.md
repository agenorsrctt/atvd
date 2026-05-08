# Sistema de Controle de Estoque

Sistema simples de controle de estoque desenvolvido com HTML, CSS e JavaScript puro.

O projeto permite cadastrar, editar, excluir e pesquisar produtos, além de salvar os dados no navegador usando `localStorage`.

---

## Funcionalidades

* Cadastro de produtos
* Edição de produtos
* Exclusão de produtos
* Pesquisa dinâmica
* Soma total dos preços
* Soma total das quantidades
* Salvamento automático no navegador (`localStorage`)
* Conversão de preços com vírgula e ponto
* Interface simples e responsiva

---

## Tecnologias Utilizadas

* HTML5
* CSS3
* JavaScript Vanilla

---

## Como funciona

Cada produto possui:

* Nome
* Preço
* Quantidade

Os produtos são armazenados em um array e renderizados dinamicamente em uma tabela.

Os dados permanecem salvos mesmo após atualizar a página, utilizando:

```js id="if7imw"
localStorage
```

---

## Estrutura do Projeto

```txt id="q5szdx"
📁 projeto
 ├── index.html
```

---

## Conceitos utilizados

O projeto utiliza diversos conceitos importantes de JavaScript:

* `addEventListener`
* `querySelector`
* `createElement`
* `appendChild`
* `forEach`
* `filter`
* `reduce`
* `JSON.parse`
* `JSON.stringify`
* `localStorage`
* Manipulação de DOM
* Eventos de formulário
* Funções
* Arrays e objetos

---

## Exemplo de Produto

```js id="jlwmvv"
{
    produto: "ARROZ",
    preco: 12.99,
    quantidade: 5
}
```

---

## Pesquisa de Produtos

A barra de pesquisa filtra os produtos em tempo real utilizando:

```js id="6e2x94"
filter()
```

e

```js id="9izlfn"
includes()
```

---

## Cálculo de Totais

Os totais são calculados utilizando:

```js id="lj46c4"
reduce()
```

Exemplo:

```js id="mx8m4s"
function calcTotal(array, propriedade) {
    return array.reduce((total, atual) => {
        return total += Number(atual[propriedade]);
    }, 0)
}
```

---

## Salvamento no Navegador

Os dados são convertidos para JSON e armazenados com:

```js id="lln3oa"
localStorage.setItem()
```

e recuperados com:

```js id="17hjvx"
localStorage.getItem()
```

---

## Melhorias Futuras

* Melhorar o design da interface
* Adicionar responsividade mobile
* Utilizar `confirm()` ao invés de `prompt()`
* Adicionar máscara monetária
* Separar HTML, CSS e JS em arquivos diferentes
* Criar backend com Node.js e banco de dados
* Adicionar autenticação de usuários

---

## Autor

Projeto desenvolvido por Agenor como prática de JavaScript, manipulação de DOM e lógica de programação.
