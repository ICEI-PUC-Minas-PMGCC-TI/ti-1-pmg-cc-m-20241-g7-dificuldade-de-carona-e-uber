const apiUrl = 'http://localhost:3000/posts'; // Usando a rota /posts diretamente

function displayMessage(mensagem) {
    const msg = document.getElementById('msg');
    msg.innerHTML = '<div class="alert alert-warning">' + mensagem + '</div>';
}

function readContato(processaDados) {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('Dados obtidos com sucesso:', data); // Mensagem de sucesso no console
            processaDados(data);
        })
        .catch(error => {
            console.error('Erro ao ler dados via API JSONServer:', error);
            displayMessage("Erro ao ler dados");
        });
}

function exibirPosts(posts) {
    const usersPosts = document.getElementById('postsFiltrados');
    usersPosts.innerHTML = ''; // Limpa o conteúdo atual

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
                        <img class="img_perfil" src="${post.profile_img}" alt="Imagem de perfil do usuário">
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
                        <li><strong>Data da postagem:</strong> ${formattedTimestamp}</li>
                        <li><strong>Zona:</strong> ${post.zone}</li>
                        <li><strong>Valor:</strong> ${formattedValue}</li>
                        <li><strong>Endereço:</strong> ${post.address}</li>
                        <li><strong>Horário de chegada:</strong> ${post.time}</li>
                        <li><strong>Gênero:</strong> ${post.genero}</li>
                    </ul>
                </div>
            </div>
        `;

        usersPosts.appendChild(postDiv);
    });
}

// Função para processar os dados e extrair todos os posts de todos os usuários
function processaDados(posts) {
    exibirPosts(posts);
}

// Chame a função para ler os dados quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    readContato(processaDados);

    const filtrarForm = document.getElementById('form'); // Obtém o formulário
    filtrarForm.addEventListener('submit', (event) => { // Adiciona um evento de envio do formulário
        event.preventDefault(); // Impede o comportamento padrão de envio do formulário

        // Obtendo os valores selecionados nas dropdowns
        const filterTime = document.getElementById('FilterTime').value;
        const filterZone = document.getElementById('FilterZone').value;
        const filterValue = document.getElementById('FilterValue').value;
        const filterType = document.getElementById('Filtertype').value;
        const filterGenero = document.getElementById('Filtergender').value;

        // Função para filtrar os posts de acordo com os valores selecionados
        const filtrarPosts = (posts) => {
            return posts.filter(post => {
                return (filterTime === '' || post.time === filterTime) &&
                    (filterZone === '' || post.zone === filterZone) &&
                    (filterValue === '' || post.value === parseFloat(filterValue)) &&
                    (filterType === '' || post.type === filterType) &&
                    (filterGenero === '' || post.genero === filterGenero);
            });
        };

        // Função para exibir os posts filtrados
        const exibirPostsFiltrados = (postsFiltrados) => {
            exibirPosts(postsFiltrados);
        };

        // Lendo os dados novamente e aplicando os filtros
        readContato((posts) => {
            const postsFiltrados = filtrarPosts(posts);
            exibirPostsFiltrados(postsFiltrados);
        });
    });

    // Função para limpar os filtros
    function limparFiltros() { 
        document.getElementById('FilterTime').value = '';
        document.getElementById('FilterZone').value = '';
        document.getElementById('FilterValue').value = '';
        document.getElementById('Filtertype').value = '';
        document.getElementById('Filtergender').value = '';
        readContato(processaDados); // Recarregar todos os posts
    }

    // Adiciona o listener para o botão de limpar filtros
    const clearFiltersButton = document.getElementById('clearFiltersButton');
    clearFiltersButton.addEventListener('click', limparFiltros);
});
