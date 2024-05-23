// <!-- MARCELLA-->

// Variáveis globais para armazenar os dados dos usuários e posts
let usersData = [];
let currentUserPosts = [];

// Carregar os dados dos usuários e exibir os posts do usuário com id 1 inicialmente
fetch('http://127.0.0.1:5501/codigo/assets/json/js_json_minhas_caronas/minhas_caronas.json')

  .then(response => response.json())
  .then(data => {
    console.log(data); // Adicionando console.log para verificar os dados carregados
    usersData = data.users;
    const user1 = usersData.find(user => user.id === 1);
    if (user1) {
      currentUserPosts = user1.posts;
      exibirPosts(currentUserPosts);
    }
  })
  .catch(error => console.error('Erro ao carregar dados:', error));
  
// Função para exibir os posts
function exibirPosts(posts) {
    const meusPosts = document.getElementById('meusposts');
    meusPosts.innerHTML = ''; // Limpa o conteúdo atual

    posts.forEach(function(post) {
        const postDiv = document.createElement('div');
        postDiv.classList.add('postexemplo');
        // Formata o valor como moeda brasileira
        const formattedValue = post.value ? post.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '';

        postDiv.innerHTML = `
            <div id="espacointernopost">
                <div id="foto_nome_tipo">
                    <div id="foto_nome">
                        <img class="img_perfil" src="https://i.postimg.cc/Wprzz5n6/img-perfil-post.png" alt="Imagem de perfil do usuário">
                        <p>${post.name}</p>
                    </div>
                    <div id="tipo_motorista_passageiro">
                        <p>Tipo:</p>
                        <p>${post.type}</p>
                    </div>
                </div>
                <div id="descricao_post">
                    <ul>
                        <li>${post.description}</li>
                        <br>
                        <li><strong>Zona:</strong> ${post.zone}</li>
                        <li><strong>Valor:</strong> ${formattedValue}</li>
                        <li><strong>Endereço:</strong> ${post.address}</li>
                        <li><strong>Horário de chegada:</strong> ${post.time}</li>
                    </ul>
                </div>
                <div id="botoes_editar_excluir">
                <button id="excluir" onclick="excluirPost(${post.id})"><img id="excluirimg" src="https://i.postimg.cc/SRXMcgjL/excluir.png" alt="excluir"></button>
                <button id="editar" onclick="editarPost(${post.id})"><img id="editarimg" src="https://i.postimg.cc/FHvxQQ72/edit.png" alt="editar"></button>
                </div>
            </div>
        `;

        meusPosts.appendChild(postDiv);
    });
}

// Função para excluir um post
function excluirPost(postId) {
    currentUserPosts = currentUserPosts.filter(function(post) {
        return post.id !== postId;
    });

    // Reexibe os posts
    exibirPosts(currentUserPosts);
}

// Função para editar um post
function editarPost(postId) {
    const post = currentUserPosts.find(function(p) {
        return p.id === postId;
    });

    if (post) {
        document.getElementById('editPostId').value = post.id;
        document.getElementById('editPostName').value = post.name || '';
        document.getElementById('editPostType').value = post.type || '';
        document.getElementById('editPostDescription').value = post.description || '';
        document.getElementById('editPostZone').value = post.zone || '';
        document.getElementById('editPostAddress').value = post.address || '';
        document.getElementById('editPostValue').value = post.value || '';
        document.getElementById('editPostTime').value = post.time || '';

        document.getElementById('overlay').style.display = 'block';
        document.getElementById('editFormContainer').style.display = 'block';
    }
}



// Função para salvar a edição de um post
function salvarEdicao(event) {
    event.preventDefault();

    const id = parseInt(document.getElementById('editPostId').value);
    const type = document.getElementById('editPostType').value;
    const description = document.getElementById('editPostDescription').value;
    const zone = document.getElementById('editPostZone').value;
    const address = document.getElementById('editPostAddress').value;
    const value = parseFloat(document.getElementById('editPostValue').value);
    const time = document.getElementById('editPostTime').value; // Verifique esta linha

    const postIndex = currentUserPosts.findIndex(function(p) {
        return p.id === id;
    });

    if (postIndex !== -1) {
        currentUserPosts[postIndex].type = type;
        currentUserPosts[postIndex].description = description;
        currentUserPosts[postIndex].zone = zone;
        currentUserPosts[postIndex].address = address;
        currentUserPosts[postIndex].value = value;
        currentUserPosts[postIndex].time = time; // Atualizamos o valor do tempo

        exibirPosts(currentUserPosts);

        document.getElementById('editFormContainer').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    }
}



// Função para cancelar a edição
function cancelarEdicao() {
    document.getElementById('editFormContainer').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

// Função para selecionar um usuário e exibir seus posts
function selecionarUsuario(userId) {
    const user = usersData.find(user => user.id === userId);
    if (user) {
        currentUserPosts = user.posts;
        exibirPosts(currentUserPosts);
    }
}

// Exemplo de uso: Selecionar usuário com id 1 ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    selecionarUsuario(1);
});
