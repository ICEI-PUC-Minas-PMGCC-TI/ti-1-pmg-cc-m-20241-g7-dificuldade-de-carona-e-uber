document.addEventListener("DOMContentLoaded", function() {
    const cadastroForm = document.getElementById('cadastroForm');
    const loginForm = document.getElementById('loginForm');

    if (cadastroForm) {
        cadastroForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o envio padrão do formulário

            // Obtém os valores do formulário de cadastro
            const nome = document.getElementById('cadastro-nome').value;
            const cpf = document.getElementById('cadastro-cpf').value;
            const telefone = document.getElementById('cadastro-telefone').value;
            const email = document.getElementById('cadastro-email').value;
            const sexo = document.getElementById('cadastro-sexo').value;
            const dataNascimento = document.getElementById('cadastro-data-nascimento').value;
            const senhaCadastro = document.getElementById('senhaCadastro').value;

            // Aqui você pode adicionar a lógica para verificar se o cadastro é possível
            const cadastroSucesso = true; // Simulando um cadastro bem-sucedido

            if (cadastroSucesso) {
                // Exibe um pop-up de sucesso
                alert("Cadastro realizado com sucesso! Você será redirecionado para a página de login.");

                // Redireciona para a página de login após o cadastro bem-sucedido
                window.location.href = "/codigo/pages/perfil/bruno_crud-login.html";
            } else {
                // Exibe um pop-up de erro
                alert("Não foi possível realizar o cadastro. Por favor, tente novamente mais tarde.");
            }

            // Limpa os campos do formulário após o envio
            cadastroForm.reset();
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o envio padrão do formulário

            // Obtém os valores do formulário de login
            const cpfLogin = document.getElementById('cpf').value;
            const senhaLogin = document.getElementById('senha').value;

            // Aqui você pode adicionar a lógica para verificar as credenciais do usuário
            const loginSucesso = true; // Simulando um login bem-sucedido

            if (loginSucesso) {
                // Exibe um pop-up de sucesso
                alert("Login realizado com sucesso! Você será redirecionado para a página inicial.");

                // Redireciona para a página inicial após o login bem-sucedido
                window.location.href = "/codigo/inicio.html";
            } else {
                // Exibe um pop-up de erro
                alert("E-mail ou senha incorretos. Por favor, verifique seus dados e tente novamente.");
            }

            // Limpa os campos do formulário após o envio
            loginForm.reset();
        });
    }
});
