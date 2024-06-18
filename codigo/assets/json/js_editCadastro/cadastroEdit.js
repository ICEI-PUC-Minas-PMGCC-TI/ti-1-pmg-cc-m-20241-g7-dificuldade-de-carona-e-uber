document.addEventListener('DOMContentLoaded', function() {
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    if (usuario) {
        document.getElementById('nome').value = usuario.nome;
        document.getElementById('email').value = usuario.email;
        document.getElementById('telefone').value = usuario.telefone;
        document.getElementById('cpf').value = usuario.cpf;
        document.getElementById('sexo').value = usuario.sexo;
        document.getElementById('data').value = usuario.dataNascimento;
    }

    document.getElementById('cadastroEdit').addEventListener('submit', function(event) {
        event.preventDefault();

        // Coletar os valores dos campos do formulário
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        const cpf = document.getElementById('cpf').value;
        const sexo = document.getElementById('sexo').value;
        const dataNascimento = document.getElementById('data').value;

        // Criar objeto usuário
        const usuarioAtualizado = {
            nome: nome,
            email: email,
            telefone: telefone,
            cpf: cpf,
            sexo: sexo,
            dataNascimento: dataNascimento,
            senha: usuario.senha // Mantém a senha existente
        };

        // Atualizar no Local Storage
        localStorage.setItem('usuario', JSON.stringify(usuarioAtualizado));

        // Mensagem de sucesso
        alert('Dados atualizados com sucesso!');

        // Redirecionar para a página inicial (ou qualquer outra página)
        window.location.href = '/codigo/inicio.html';
    });
});
