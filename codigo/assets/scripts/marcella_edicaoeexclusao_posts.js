var user = [
    {
        "id": 1,
        "name": "Mariana Silva",
        "type": "Passageiro(a)",
        "description": "Estou procurando uma carona diária pela manhã, idealmente saindo por volta das 7h30. Posso contribuir com as despesas de viagem!",
        "zone": "Oeste",
        "address": "Rua Lauro Ferrera 132 - Buritis"
    },
    {
        "id": 2,
        "name": "José Lima",
        "type": "Motorista",
        "description": "Estou procurando uma carona diária pela manhã, idealmente saindo por volta das 7h30. Posso contribuir com as despesas de viagem!",
        "zone": "Pampulha",
        "address": "Rua Fulano da Silva - Pampulha"
    }
];

function exibirPosts() {
    var meusPosts = document.getElementById('meusposts');
    meusPosts.innerHTML = ''; // Limpa o conteúdo atual

    user.forEach(function(usuario) {
        var postDiv = document.createElement('div');
        postDiv.classList.add('postexemplo');

        postDiv.innerHTML = `
            <div id="espacointernopost">
                <div id="foto_nome_tipo">
                    <div id="foto_nome">
                        <img class="img_perfil" src="https://i.postimg.cc/Wprzz5n6/img-perfil-post.png" alt="Imagem de perfil do usuário">
                        <p>${usuario.name}</p>
                    </div>
                    <div id="tipo_motorista_passageiro">
                        <p>Tipo:</p>
                        <p>${usuario.type}</p>
                    </div>
                </div>
                <div id="descricao_post">
                    <ul>
                        <li>${usuario.description}</li>
                    </ul>
                </div>
                <div id="botoes_editar_excluir">
                <button onclick="editarPost(${usuario.id})">editar</button>
                <button onclick="excluirPost(${usuario.id})">excluir</button>
                </div>
            </div>
        `;

        meusPosts.appendChild(postDiv);
    });
}

function excluirPost(userId) {
    // Remove o usuário do array
    user = user.filter(function(usuario) {
        return usuario.id !== userId;
    });

    // Reexibe os posts
    exibirPosts();
}

function editarPost(userId) {
    // Função de edição (a ser implementada)
    alert('Função de edição ainda não implementada para o usuário com ID ' + userId);
}