window.addEventListener("load", () => {
    listarProdutosFavoritos();
});

function listarProdutosFavoritos() {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    const favoritosProdutos = document.getElementById('favoritos-produtos');

    favoritosProdutos.innerHTML = '';

    if (favoritos.length === 0) {
        favoritosProdutos.innerHTML = '<p>Nenhum produto favorito.</p>';
    } else {
        favoritos.forEach(produto => {
            const card = `
            <div class="produto">
                <img src="http://localhost:3000/uploads/${produto.image}" alt="${produto.title}">
                <p class="preco">${produto.title}</p>
                <p class="preco">R$ ${produto.price}</p>
            </div>
            `;
            favoritosProdutos.innerHTML += card;
        });
    }
}
