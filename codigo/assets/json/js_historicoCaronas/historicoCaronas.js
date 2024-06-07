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

// Função para carregar os posts do localStorage e exibi-los na página
function carregarHistorico() {
  let posts = JSON.parse(localStorage.getItem('Posts'));
  let cardsContainer = document.getElementById('cards_container');

  // Combina todos os posts em uma única lista
  let allPosts = [];
  if (posts.PostsMotoristas) {
      allPosts = allPosts.concat(posts.PostsMotoristas);
  }
  if (posts.PostsPassageiros) {
      allPosts = allPosts.concat(posts.PostsPassageiros);
  }

  // Filtra os posts contatados e cria um card para cada um
  allPosts.filter(post => post.contatado === true).forEach(post => {
      let card = criarCard(post);
      cardsContainer.appendChild(card);
  });
}

// Chama a função para carregar o histórico quando a página é carregada
document.addEventListener('DOMContentLoaded', carregarHistorico);
