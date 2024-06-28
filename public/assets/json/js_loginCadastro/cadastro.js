document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Coletar os valores dos campos do formulário
    const nome = document.getElementById('cadastro-nome').value;
    const cpf = document.getElementById('cadastro-cpf').value;
    const telefone = document.getElementById('cadastro-telefone').value;
    const email = document.getElementById('cadastro-email').value;
    const sexo = document.getElementById('cadastro-sexo').value;
    const dataNascimento = document.getElementById('cadastro-data-nascimento').value;
    const senha = document.getElementById('senhaCadastro').value;

    // Criar objeto usuário
    const usuario = {
        nome: nome,
        cpf: cpf,
        telefone: telefone,
        email: email,
        sexo: sexo,
        dataNascimento: dataNascimento,
        senha: senha
    };

    // Salvar no Local Storage
    localStorage.setItem('usuario', JSON.stringify(usuario));

    // Mensagem de sucesso
    document.getElementById('msg').innerText = 'Usuário cadastrado com sucesso!';
    document.getElementById('msg').style.color = 'green';

    // Limpar o formulário
    document.getElementById('cadastroForm').reset();

    window.location.href = '../perfil/bruno_crud-login.html';
});
