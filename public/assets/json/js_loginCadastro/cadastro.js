document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const apiUrl = 'http://localhost:3000/users';

    // Coletar os valores dos campos do formulário
    const nome = document.getElementById('cadastro-nome').value;
    const cpf = document.getElementById('cadastro-cpf').value;
    const telefone = document.getElementById('cadastro-telefone').value;
    const email = document.getElementById('cadastro-email').value;
    const sexo = document.getElementById('cadastro-sexo').value;
    const dataNascimento = document.getElementById('cadastro-data-nascimento').value;
    const senha = document.getElementById('senhaCadastro').value;

    // Buscar os usuários existentes para determinar o próximo ID
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar usuários existentes: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Encontrar o maior ID existente e incrementar
            const maxId = data.length > 0 ? Math.max(...data.map(user => user.id)) : 0;
            const newId = maxId + 1;

            // Criar objeto usuário com o novo ID
            const usuario = {
                id: newId,
                name: nome,
                cpf: cpf,
                telefone: telefone,
                email: email,
                sexo: sexo,
                dataNascimento: dataNascimento,
                senha: senha
            };

            // Enviar os dados para o servidor JSON
            return fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuario)
            });
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw new Error('Erro ao cadastrar usuário: ' + err.message); });
            }
            return response.json();
        })
        .then(data => {
            // Mensagem de sucesso
            document.getElementById('msg').innerText = 'Usuário cadastrado com sucesso!';
            document.getElementById('msg').style.color = 'green';

            // Limpar o formulário
            document.getElementById('cadastroForm').reset();

            // Redirecionar para a página de login
            window.location.href = '../perfil/bruno_crud-login.html';
        })
        .catch(error => {
            console.error('Erro:', error);
            // Mensagem de erro
            document.getElementById('msg').innerText = 'Erro ao cadastrar usuário!';
            document.getElementById('msg').style.color = 'red';
        });
});
