window.addEventListener("load", () => {
    listarProdutos();

    if (localStorage.getItem("informacoes")) {
        let html = document.getElementById("informacoes");
        let dados = JSON.parse(localStorage.getItem("informacoes"));

        dados.perfil === 'admin'
            ? document.getElementById('cadastrar_produto').style.display = 'block'
            : document.getElementById('cadastrar_produto').style.display = 'none';

        html.innerHTML = `<div style="display: flex; flex-direction: column; align-items: end">
            id: ${dados.id} nome:${dados.name} email:${dados.email} perfil:${dados.perfil}
            </div>`;
        html.style.display = 'block';
    }
});

function sair(event) {
    localStorage.removeItem("informacoes");
    window.location.href = "loja.html";
}

async function cadastrarProduto(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const price = Number(document.getElementById("price").value);
    const file = document.getElementById("file").files[0];

    if (!title || !price || !file) {
        alert("Todos os campos são obrigatórios!");
        return;
    }

    let formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("file", file);

    try {
        console.log("Enviando dados do produto:", { title, price });
        const response = await fetch('http://localhost:3000/produto/cadastrar', {
            method: "POST",
            body: formData
        });

        const results = await response.json();

        if (results.success) {
            alert(results.message);
            listarProdutos();
        } else {
            alert(results.message);
        }
    } catch (error) {
        alert("Erro ao cadastrar o produto!");
    }
}

async function listarProdutos() {
    const response = await fetch('http://localhost:3000/produtos/listar', {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const results = await response.json();

    if (results.success) {
        let productData = results.data;
        const images = 'http://localhost:3000/uploads/';
        let html = document.getElementById('card-produto');
        html.innerHTML = '';

        productData.forEach(product => {
            let card = `
            <div class="produto">
                <img src="${images + product.image}" alt="${product.title}">
                <p class="preco">${product.title}<br></p>
                <p class="preco">${product.price}</p>
                <div class="produto-botoes">
                    <button class="botao adicionar-carrinho" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-image="${product.image}">Adicionar ao Carrinho</button>
                    <button class="botao editar" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-image="${product.image}" onclick="formEditarProduto(event)">Editar</button>
                </div>
            </div>`;
        
            html.innerHTML += card;
        
            const buttonAdicionar = html.lastChild.querySelector('.adicionar-carrinho');
            buttonAdicionar.addEventListener('click', adicionarAoCarrinho);
        });
    } else {
        alert(results.message);
    }
}

function adicionarAoCarrinho(event) {
    console.log("Botão de adicionar ao carrinho clicado!");

    const button = event.currentTarget;
    const id = button.getAttribute('data-id');
    const title = button.getAttribute('data-title');
    const price = button.getAttribute('data-price');
    const image = button.getAttribute('data-image');

    const produto = {
        id: id,
        title: title,
        price: price,
        image: image
    };

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    carrinho.push(produto);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    console.log('Produto adicionado ao carrinho:', produto);
    alert(`${title} adicionado ao carrinho!`);
}

function formEditarProduto(event) {
    console.log("Botão de editar clicado!");

    const button = event.currentTarget;
    const id = button.getAttribute('data-id');
    const title = button.getAttribute('data-title');
    const price = button.getAttribute('data-price');
    const image = button.getAttribute('data-image');

    document.getElementById('id_produto').value = id;
    document.getElementById('editar_titulo').value = title;
    document.getElementById('editar_preco').value = price;
    document.getElementById('imagem_produto').src = `http://localhost:3000/uploads/${image}`;

    document.getElementById('editar_produto').style.display = 'block';
}

async function atualizarProduto(event) {
    event.preventDefault();

    const id = document.getElementById('id_produto').value;
    const title = document.getElementById('editar_titulo').value;
    const price = Number(document.getElementById('editar_preco').value);
    const file = document.getElementById('editar_imagem').files[0];

    if (!title || !price) {
        alert("Nome e preço são obrigatórios!");
        return;
    }

    let formData = new FormData();
    formData.append("id", id);
    formData.append("title", title);
    formData.append("price", price);
    if (file) {
        formData.append("file", file);
    }

    try {
        console.log("Atualizando produto:", { id, title, price });
        const response = await fetch(`http://localhost:3000/produto/atualizar/${id}`, {
            method: "PUT",
            body: formData
        });

        const results = await response.json();

        if (results.success) {
            alert(results.message);
            listarProdutos();
            fecharModal();
        } else {
            alert(results.message);
        }
    } catch (error) {
        alert("Erro ao atualizar o produto!");
    }
}

function fecharModal() {
    document.getElementById('editar_produto').style.display = 'none';
}

document.querySelector('.modal-overlay').addEventListener('click', fecharModal);

async function excluirProduto(event) {
    event.preventDefault();

    const id = document.getElementById('id_produto').value;

    if (!id) {
        alert("ID do produto é obrigatório!");
        return;
    }

    try {
        console.log("Excluindo produto:", { id });
        const response = await fetch(`http://localhost:3000/produto/excluir/${id}`, {
            method: "DELETE",
        });

        const results = await response.json();

        if (results.success) {
            alert(results.message);
            listarProdutos();
            fecharModal();
        } else {
            alert(results.message);
        }
    } catch (error) {
        alert("Erro ao excluir o produto!");
    }
}

function adicionarFavoritos(event, product) {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    const index = favoritos.findIndex(item => item.id === product.id);
    if (event.target.checked) {
        if (index === -1) {
            favoritos.push(product);
            localStorage.setItem('favoritos', JSON.stringify(favoritos));
        }
    } else {
        if (index !== -1) {
            favoritos.splice(index, 1);
            localStorage.setItem('favoritos', JSON.stringify(favoritos));
        }
    }
}
