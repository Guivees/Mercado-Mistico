document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('reset-btn').addEventListener('click', async function(event) {
        event.preventDefault();

        const email = document.getElementById('reset-email').value;
        const newPassword = document.getElementById('new-password').value;

        try {
            const response = await fetch('http://localhost:3000/usuario/reset-password', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, newPassword })
            });

            const results = await response.json();

            if (results.success) {
                alert(results.message);
                window.location.href = 'login.html';
            } else {
                alert(results.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Erro ao redefinir a senha');
        }
    });
});
