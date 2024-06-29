document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Coletar os valores dos campos do formulário
    const cpf = document.getElementById('cpf').value;
    const senha = document.getElementById('senha').value;

    // Buscar os usuários no servidor JSON
    fetch('http://localhost:3000/users')
    
        .then(response => response.json())
        .then(users => {
            // Verificar se o usuário existe e se a senha está correta
            const usuario = users.find(user => user.cpf === cpf && user.senha === senha);

            if (usuario) {
                document.getElementById('msg').innerText = 'Login realizado com sucesso!';
                document.getElementById('msg').style.color = 'green';
                // Redirecionar para a página inicial (ou qualquer outra página)
                window.location.href = '../perfil/bruna_crud-cadastro-veiculo.html';
            } else {
                document.getElementById('msg').innerText = 'CPF ou senha incorretos!';
                document.getElementById('msg').style.color = 'red';
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            // Mensagem de erro
            document.getElementById('msg').innerText = 'Erro ao realizar login!';
            document.getElementById('msg').style.color = 'red';
        });
});
