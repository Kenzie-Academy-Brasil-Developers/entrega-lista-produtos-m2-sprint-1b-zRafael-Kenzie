// seu código aqui
let listaDeProdutos = document.querySelector("ul")
let arrayCategorias = ["Todos", "Hortifruti", "Panificadora", "Laticínio"]
let arrayDeBusca = []

function renderizarVitrine(array, categoriaSelecionada) {
    let containerProdutos = document.querySelector(".containerListaProdutos ul")
    containerProdutos.innerText = ""


    if (categoriaSelecionada == "Todos") {
        array.forEach(elem => {

            let cardProduto = document.createElement("li")
            let imgProduto = document.createElement("img")
            let nomeProduto = document.createElement("h3")
            let secaoProduto = document.createElement("span")
            let precoProduto = document.createElement("P")

            imgProduto.src = elem.img
            nomeProduto.innerText = elem.nome
            secaoProduto.innerText = elem.categoria
            precoProduto.innerText = `R$ ${elem.preco}`

            cardProduto.append(imgProduto, nomeProduto, secaoProduto, precoProduto)
            containerProdutos.appendChild(cardProduto)
        })
    } else {
        array.forEach(elem => {
            if (elem.secao == categoriaSelecionada) {

                let cardProduto = document.createElement("li")
                let imgProduto = document.createElement("img")
                let nomeProduto = document.createElement("h3")
                let secaoProduto = document.createElement("span")
                let precoProduto = document.createElement("P")

                imgProduto.src = elem.img
                nomeProduto.innerText = elem.nome
                secaoProduto.innerText = elem.categoria
                precoProduto.innerText = `R$ ${elem.preco}`


                cardProduto.append(imgProduto, nomeProduto, secaoProduto, precoProduto)
                containerProdutos.appendChild(cardProduto)
            }
        })
    }
}

function renderizarPreco(array, categoriaSelecionada) {

    let priceContainer = document.querySelector('.priceContainer article')

    let contador = 0
    priceContainer.innerHTML = ""

    if (categoriaSelecionada == "Todos") {
        array.forEach(element => {
            contador = element.preco + contador




        });
    }
    else {
        array.forEach(element => {
            if (element.secao == categoriaSelecionada) {
                contador = element.preco + contador

            }
        })
    }
    let totalPreco = document.createElement("span")
    totalPreco.innerText = `R$ `+contador
    priceContainer.appendChild(totalPreco)
}

function renderizar() {
    renderizarVitrine(produtos, "Todos")
    renderizarPreco(produtos, "Todos")
}

renderizar()

let navigation = document.querySelector("#botoesContainer")
let inputBusca = document.querySelector(".campoBuscaPorNome ")
let buttonBusca = document.querySelector(".containerBuscaPorNome button")
navigation.addEventListener("click", produtosPorCategorias)
buttonBusca.addEventListener("click", buscaProdutos)


function produtosPorCategorias(event) {
    if (event.target.tagName == "BUTTON") {

        for (let i = 0; i < arrayCategorias.length; i++) {
            if (i == Number(event.target.id)) {
                renderizarVitrine(produtos, arrayCategorias[i])
                renderizarPreco(produtos, arrayCategorias[i])
            }
        }
    }
}


function buscaProdutos() {
    let valorBusca = inputBusca.value.toLowerCase()
    arrayDeBusca.length = 0
    produtos.forEach(elem => {
        if (elem.nome.toLowerCase().includes(valorBusca) == true) {
            arrayDeBusca.push(elem)
        }
    })
    renderizarVitrine(arrayDeBusca, "Todos")
}