// <!-- MARCELLA-->



// Variáveis globais para armazenar os dados dos usuários e posts
let usersData = [];
let currentUserPosts = [];

// Carregar os dados dos usuários e exibir os posts do usuário com id 1 inicialmente
document.addEventListener('DOMContentLoaded', () => {
    const storedPosts = localStorage.getItem('userPosts');
    if (storedPosts) {
        currentUserPosts = JSON.parse(storedPosts);
        exibirPosts(currentUserPosts);
    } else {
        fetch('../../assets/json/js_json_minhas_caronas/minhas_caronas.json')
            .then(response => response.json())
            .then(data => {
                usersData = data.users;
                const user1 = usersData.find(user => user.id === 1);
                if (user1) {
                    currentUserPosts = user1.posts;
                    exibirPosts(currentUserPosts);
                }
            })
            .catch(error => console.error('Erro ao carregar dados:', error));
    }
});

// Função para exibir os posts
function exibirPosts(posts) {
    const meusPosts = document.getElementById('meusposts');
    meusPosts.innerHTML = ''; // Limpa o conteúdo atual

    posts.forEach(function(post) {
        const postDiv = document.createElement('div');
        postDiv.classList.add('postexemplo');
        // Formata o valor como moeda brasileira
        const formattedValue = post.value ? post.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '';
         // Processa a data do timestamp
         const formattedTimestamp = new Date(post.timestamp).toLocaleDateString('pt-BR');
        console.log('formattedTimestamp:', formattedTimestamp);
         

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

    // Salvar os posts atualizados no localStorage
    localStorage.setItem('userPosts', JSON.stringify(currentUserPosts));

    // Reexibir os posts
    exibirPosts(currentUserPosts);
}

// Função para editar um post
function editarPost(postId) {
    const post = currentUserPosts.find(function(p) {
        return p.id === postId;
    });

    if (post) {
        document.getElementById('editPostId').value = post.id;
        document.getElementById('editPostType').value = post.type;
        document.getElementById('editPostDescription').value = post.description;
        document.getElementById('editPostZone').value = post.zone || '';
        document.getElementById('editPostAddress').value = post.address;
        document.getElementById('editPostValue').value = post.value || ''; // Corrigido
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
    const value = parseInt(document.getElementById('editPostValue').value);
    const time = document.getElementById('editPostTime').value;

    const postIndex = currentUserPosts.findIndex(function(p) {
        return p.id === id;
    });

    if (postIndex !== -1) {
        currentUserPosts[postIndex].type = type;
        currentUserPosts[postIndex].description = description;
        currentUserPosts[postIndex].zone = zone;
        currentUserPosts[postIndex].address = address;
        currentUserPosts[postIndex].value = value;
        currentUserPosts[postIndex].time = time; 

        // Salvar os posts atualizados no localStorage
        localStorage.setItem('userPosts', JSON.stringify(currentUserPosts));

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

// Função para salvar um post no Local Storage
function salvarPostLocalStorage(post) {
    // Verifica se já existem posts salvos no Local Storage
    let savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    // Adiciona o novo post à lista de posts salvos
    savedPosts.push(post);
    // Salva a lista atualizada de posts no Local Storage
    localStorage.setItem('posts', JSON.stringify(savedPosts));
}

// Função para carregar os posts do Local Storage
function carregarPostsLocalStorage() {
    return JSON.parse(localStorage.getItem('posts')) || [];
}

