document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Coletar os valores dos campos do formulário
    const cpf = document.getElementById('cpf').value;
    const senha = document.getElementById('senha').value;

    // Obter o usuário do Local Storage
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    // Verificar se o CPF e a senha estão corretos
    if (usuario && usuario.cpf === cpf && usuario.senha === senha) {
        document.getElementById('msg').innerText = 'Login realizado com sucesso!';
        document.getElementById('msg').style.color = 'green';
        // Redirecionar para a página inicial (ou qualquer outra página)
        window.location.href = '../perfil/bruna_crud-cadastro-veiculo.html';
    } else {
        document.getElementById('msg').innerText = 'CPF ou senha incorretos!';
        document.getElementById('msg').style.color = 'red';
    }
});
