let listaDeProdutos = document.querySelector("ul")
let arrayCategorias = ["Todos", "Hortifruti", "Panificadora", "Laticínios"]
let arrayDeBusca = []


function renderizarVitrine(array, categoriaSelecionada) {
    let containerProdutos = document.querySelector(".containerListaProdutos ul")
    containerProdutos.innerText = ""


    if (categoriaSelecionada == "Todos") {
        array.forEach(elem => {

            let cardProdutos = document.createElement("li")
            let imgProduto = document.createElement("img")
            let nomeProduto = document.createElement("h3")
            let categoriaProduto = document.createElement("span")
            let precoProduto = document.createElement("p")
            let btnComprar = document.createElement("button")
            let nutrientes = document.createElement("p")
            let divDeAlinhamento = document.createElement("div")

            imgProduto.src = elem.img
            imgProduto.alt = elem.nome
            nomeProduto.innerText = elem.nome
            categoriaProduto.innerText = elem.secao
            precoProduto.innerText = `R$ ${elem.preco},00`
            precoProduto.classList.add("price")
            btnComprar.innerText = "Comprar"
            btnComprar.id = elem.id
            nutrientes.innerHTML = nutrients(elem.componentes)

            divDeAlinhamento.append(precoProduto, btnComprar)
            cardProdutos.append(imgProduto, nomeProduto, categoriaProduto, nutrientes, divDeAlinhamento)
            containerProdutos.appendChild(cardProdutos)
        })
    } else {
        array.forEach(elem => {
            if (elem.secao == categoriaSelecionada) {

                let cardProdutos = document.createElement("li")
                let imgProduto = document.createElement("img")
                let nomeProduto = document.createElement("h3")
                let categoriaProduto = document.createElement("span")
                let precoProduto = document.createElement("p")
                let btnComprar = document.createElement("button")
                let nutrientes = document.createElement("p")
                let divDeAlinhamento = document.createElement("div")

                imgProduto.src = elem.img
                imgProduto.alt = elem.nome
                nomeProduto.innerText = elem.nome
                categoriaProduto.innerText = elem.secao
                precoProduto.innerText = `R$ ${elem.preco},00`
                precoProduto.classList.add("price")
                btnComprar.innerText = "Comprar"
                btnComprar.id = elem.id
                nutrientes.innerHTML = nutrients(elem.componentes)

                divDeAlinhamento.append(precoProduto, btnComprar)
                cardProdutos.append(imgProduto, nomeProduto, categoriaProduto, nutrientes, divDeAlinhamento)
                containerProdutos.appendChild(cardProdutos)
            }
        })
    }
}
function nutrients(nutrientsArray) {

    let nutrients = []

    for (let i = 0; i < nutrientsArray.length; i++) {
        let allNutrients = nutrientsArray[i]
        nutrients.push(`${i + 1}. ${allNutrients} <br>`)


    }

    return nutrients.join("")
}

const botaoDeCompra = document.querySelector(".containerListaProdutos ul")
botaoDeCompra.addEventListener("click", addItensInCart)

function addItensInCart(event) {

    let buyButton = event.target

    if (buyButton.tagName === "BUTTON") {
        let productId = buyButton.id
        let product = produtos.find((product) => {

            if (product.id == productId) {
                return product
            }
        })

        adicionarAoCarrinho(product)

    }

}

function adicionarAoCarrinho(product) {

    const listaCarrinho = document.querySelector("#listaCarrinho")

    if (product !== undefined) {
        carrinhoCompras.push(product)
        listarProdutosCarrinho(carrinhoCompras, listaCarrinho)

    }

}

function listarProdutosCarrinho(productList, section) {

    section.innerHTML = ""

    const precoTotal = document.querySelector("#precoTotal")
    const quantidadeTotal = document.querySelector("#quantidadeTotal")
    const precoQuantidadeContainer = document.querySelector("#precoQuantidadeContainer")
    const listaCarrinho = document.querySelector("#listaCarrinho")
    const imgCarrinhoVazio = document.querySelector(".empityCartImg")
    const pCarrinhoVazio = document.querySelector(".empityCartP")


    function cleanCart() {

        if (carrinhoCompras.length >= 1) {

            precoQuantidadeContainer.classList.remove("hidden")
            listaCarrinho.classList.remove("hidden")
            imgCarrinhoVazio.classList.add("hidden")
            pCarrinhoVazio.classList.add("hidden")

        } if (carrinhoCompras.length == 0) {

            precoQuantidadeContainer.classList.add("hidden")
            listaCarrinho.classList.add("hidden")
            imgCarrinhoVazio.classList.remove("hidden")
            pCarrinhoVazio.classList.remove("hidden")

        }
    }
    cleanCart()

    let soma = []

    productList.forEach(product => {
        soma.push(product.preco)
    })

    let result = soma.reduce((previousValue, currentValue) => previousValue + currentValue, 0)

    precoTotal.innerText = `R$${result},00`

    quantidadeTotal.innerText = productList.length

    for (let i = 0; i < productList.length; i++) {

        let products = productList[i]

        let itemInCart = listarNoCarrinho(products)

        section.appendChild(itemInCart)

    }

}


renderizarVitrine(produtos, "Todos")

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

            }
        }
    }
}


function buscaProdutos() {
    let valorBusca = inputBusca.value.toLowerCase()
    arrayDeBusca.length = 0
    produtos.forEach(elem => {
        if (elem.nome.toLowerCase().includes(valorBusca) == true || elem.categoria.toLocaleLowerCase().includes(valorBusca) == true || elem.secao.toLocaleLowerCase().includes(valorBusca) == true) {
            arrayDeBusca.push(elem)
        }
    })
    renderizarVitrine(arrayDeBusca, "Todos")

}

function listarNoCarrinho(products) {

    let tagLi = document.createElement("li");
    let tagImg = document.createElement("img");
    let tagH2 = document.createElement("h2");
    let tagSpan = document.createElement("span");
    let trashButton = document.createElement("img");
    let categoria = document.createElement("p")

    tagImg.src = products.img;
    tagImg.alt = products.nome;
    tagH2.innerText = products.nome;
    tagSpan.innerText = `R$ ${products.preco},00`;
    trashButton.id = products.id;
    trashButton.src = "./src/img/trash.svg"
    categoria.innerText = products.secao

    tagLi.classList.add("productsCart")
    tagImg.classList.add("produtoimagem")
    tagH2.classList.add("nomeProdutoCarrinho")
    tagSpan.classList.add("valorProduto")
    trashButton.classList.add("trash")
    categoria.classList.add("Categoria")
    
    tagLi.append(tagImg,tagH2,categoria,tagSpan,trashButton)

    return tagLi

}

const listaCarrinho = document.querySelector("#listaCarrinho")
listaCarrinho.addEventListener("click", tirarDoCarrinho)

function tirarDoCarrinho(event) {
    let removeButton = event.target

    if (removeButton.classList == "trash") {

        let productId = removeButton.id
        let removeProduct = carrinhoCompras.find(function (removeProduct) {

            if (removeProduct.id == productId) {
                return removeProduct
            }
        })

        let index = carrinhoCompras.indexOf(removeProduct)
        carrinhoCompras.splice(index, 1)
        listarProdutosCarrinho(carrinhoCompras, listaCarrinho)

    }

}
