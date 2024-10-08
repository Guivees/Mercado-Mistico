document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('login-btn').addEventListener('click', async function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const data = { email, password };

        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error("Falha no login");
            }

            const result = await response.json();
            console.log(result);

            if (result.success) {
                let userData = result.data;
                localStorage.setItem("informacoes", JSON.stringify(userData));

                let html = document.getElementById("informacoes"); 
                if (html) {
                    let dados = JSON.parse(localStorage.getItem("informacoes"));
                    console.log(dados);

                    html.innerHTML = `
                        <div style="display: flex; flex-direction: column; align-items: flex-end;">
                            PERFIL: ${dados.perfil}
                        </div>
                    `;

                    html.style.display = 'block';
                }
                alert(result.message);
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error("Erro:", error);
        }
    });
});
