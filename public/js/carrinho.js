window.addEventListener("load", () => {
    listarProdutosCarrinho();
});

function listarProdutosCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const carrinhoProdutos = document.getElementById('carrinho-produtos');
    let total = 0;

    carrinhoProdutos.innerHTML = '';

    if (carrinho.length === 0) {
        carrinhoProdutos.innerHTML = '<p>Nenhum produto no carrinho.</p>';
    } else {
        carrinho.forEach(produto => {
            const card = `
            <div class="produto">
                <img src="http://localhost:3000/uploads/${produto.image}" alt="${produto.title}">
                <p class="preco">${produto.title}</p>
                <p class="preco">R$ ${produto.price}</p>
            </div>
            `;
            carrinhoProdutos.innerHTML += card;
            total += Number(produto.price);
        });
    }

    document.getElementById('total-preco').textContent = total.toFixed(2);
}

document.getElementById('finalizar-compra').addEventListener('click', () => {
    localStorage.removeItem('carrinho');

    alert("Compra finalizada!");

    window.location.href = "pagamento.html";
});
