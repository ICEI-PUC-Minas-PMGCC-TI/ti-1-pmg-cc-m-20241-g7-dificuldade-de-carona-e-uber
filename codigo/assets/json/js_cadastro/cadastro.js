// URL da API JSONServer - Substitua pela URL correta da sua API
const apiUrl = 'https://f8ab6491-6f7e-4d5a-9ed7-a38b046af631-00-24zn8athwrhc4.kirk.replit.dev/contatos';

function displayMessage(mensagem) {
    const msg = document.getElementById('msg');
    msg.innerHTML = '<div class="alert alert-warning">' + mensagem + '</div>';
}

function readContato(processaDados) {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            processaDados(data);
        })
        .catch(error => {
            console.error('Erro ao ler contatos via API JSONServer:', error);
            displayMessage("Erro ao ler contatos");
        });
}

function createContato(contato, refreshFunction) {
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contato),
    })
        .then(response => response.json())
        .then(data => {
            displayMessage("Contato inserido com sucesso");
            if (refreshFunction)
                refreshFunction();
        })
        .catch(error => {
            console.error('Erro ao inserir contato via API JSONServer:', error);
            displayMessage("Erro ao inserir contato");
        });
}

function updateContato(id, contato, refreshFunction) {
    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contato),
    })
        .then(response => response.json())
        .then(data => {
            displayMessage("Contato alterado com sucesso");
            if (refreshFunction)
                refreshFunction();
        })
        .catch(error => {
            console.error('Erro ao atualizar contato via API JSONServer:', error);
            displayMessage("Erro ao atualizar contato");
        });
}

function deleteContato(id, refreshFunction) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            displayMessage("Contato removido com sucesso");
            if (refreshFunction)
                refreshFunction();
        })
        .catch(error => {
            console.error('Erro ao remover contato via API JSONServer:', error);
            displayMessage("Erro ao remover contato");
        });
}

document.addEventListener('DOMContentLoaded', function () {
    const formContato = document.getElementById('cadastroForm');
    const btnInsert = document.getElementById('btnInsert');
    
    btnInsert.addEventListener('click', function (e) {
        e.preventDefault();  // Prevent the default form submission

        if (!formContato.checkValidity()) {
            displayMessage("Preencha o formulário corretamente.");
            return;
        }

        const campoNome = document.getElementById('nome').value;
        const campoCpf = document.getElementById('cpf').value; // Assuming we want to send CPF as well
        const campoTelefone = document.getElementById('telefone').value;
        const campoEmail = document.getElementById('email').value;
        const campoSexo = document.getElementById('sexo').value;
        const campoDataNascimento = document.getElementById('data-nascimento').value;
        const campoSenha = document.getElementById('senha').value; // Assuming password needs to be stored

       
        const contato = {
            nome: campoNome,
            cpf: campoCpf,
            telefone: campoTelefone,
            email: campoEmail,
            sexo: campoSexo,
            dataNascimento: campoDataNascimento,
            senha: campoSenha
        };

        createContato(contato, () => {
            formContato.reset();
            displayMessage("Cadastro realizado com sucesso.");
        });
    });
});
