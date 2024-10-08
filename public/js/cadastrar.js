async function cadastrar(event) {
    event.preventDefault();
    console.log("Função cadastrar chamada.");

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const cpf = document.getElementById('cpf_number').value;
    const password = document.getElementById('password').value;

    const userData = {
        name: name,
        email: email,
        cpf_number: cpf,
        password: password
    };

    console.log("Dados do usuário:", userData);

    try {
        const response = await fetch('http://localhost:3000/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        console.log(result);
        alert(result.message);
    } catch (error) {
        console.error('Erro:', error);
    }
}
