async function deleteAccount() {
    const confirmation = confirm("Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.");
    if (!confirmation) {
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/usuario/excluir", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();

        if (result.success) {
            alert("Conta excluída com sucesso!");
            window.location.href = "./login.html";
        } else {
            alert(result.message);
        }
    } catch (error) {
        alert("Erro ao excluir conta!");
    }
}

document.getElementById('delete-account-btn').addEventListener('click', deleteAccount);
