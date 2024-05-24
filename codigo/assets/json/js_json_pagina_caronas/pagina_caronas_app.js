/* EXEMPLO ESTÁTICO */

fetch('/codigo/assets/json/js_json_pagina_caronas/pagina_caronas.json')
.then(response => response.json())
.then(data => {
    const container = document.getElementById('cards_container');
    data.forEach(person => {
        const cardHTML = `
            <div class="card">
                <img class ="card_img" src="/codigo/assets/images/imagens_pagina_caronas/${person.pic}" width="50" height="50">
                <div class="details">
                    <h2>${person.name} - ${person.type}</h4>
                    <p>${person.description}</p>
                    <p>Zona: ${person.zone}</p>
                    <p>Endereço: ${person.address}</p>
                </div>
                <button>Contatar</button>
            </div>
        `;
        container.innerHTML += cardHTML;
    });
})
.catch(error => console.error('Error loading the data: ' + error));

document.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const maxScroll = 300; 
    const scrollDistance = window.scrollY;

    if (scrollDistance < maxScroll) {
        header.style.opacity = 1 - scrollDistance / maxScroll;
    } else {
        header.style.opacity = 0;
    }
});



// PEGANDO DIRETO DO LOCALSTORAGE, APENAS ESTÁ SEM ESTILIZAÇÃO, PORÉM SEGUE FUNCIONAL --- AJUSTAR CSS

document.addEventListener('DOMContentLoaded', function () {
    // Verifica se há dados salvos no localStorage
    if (localStorage.getItem('Posts')) {
        // Obtém os dados salvos no localStorage
        let posts = JSON.parse(localStorage.getItem('Posts'));
        
        // Obtém o container onde os cards serão inseridos
        let cardsContainer = document.getElementById('cards_container');
        
        // Verifica se há posts de motoristas
        if (posts.PostsMotoristas && posts.PostsMotoristas.length > 0) {
            // Itera sobre os posts de motoristas e cria os cards
            posts.PostsMotoristas.forEach(function (post) {
                let card = criarCard(post);
                cardsContainer.appendChild(card);
            });
        }
        
        // Verifica se há posts de passageiros
        if (posts.PostsPassageiros && posts.PostsPassageiros.length > 0) {
            // Itera sobre os posts de passageiros e cria os cards
            posts.PostsPassageiros.forEach(function (post) {
                let card = criarCard(post);
                cardsContainer.appendChild(card);
            });
        }
    }
});

// Função para criar um card com as informações do post
function criarCard(post) {
    let card = document.createElement('div');
    card.classList.add('card');

    let tipo = document.createElement('p');
    tipo.textContent = `Tipo: ${post.tipo}`;

    let descricao = document.createElement('p');
    descricao.textContent = `Descrição: ${post.descricao}`;

    let zonas = document.createElement('p');
    zonas.textContent = `Zonas: ${post.zonascarona}`;

    let endereco = document.createElement('p');
    endereco.textContent = `Endereço: ${post.endereco}`;

    card.appendChild(tipo);
    card.appendChild(descricao);
    card.appendChild(zonas);
    card.appendChild(endereco);

    // Adiciona o campo "Valor" apenas se o tipo for "Motorista"
    if (post.tipo === "Motorista") {
        let valor = document.createElement('p');
        valor.textContent = `Valor: ${post.valor}`;
        card.appendChild(valor);
    }

    return card;
}
