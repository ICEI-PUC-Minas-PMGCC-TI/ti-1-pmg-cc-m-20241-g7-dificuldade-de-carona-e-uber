// Função para capturar os dados do formulário de passageiro
function capturarDadosDoFormularioPassageiro() {
  let descricao = document.getElementById('campoDescricao').value;
  let zonas = document.getElementById('campoZonas').value;
  let endereco = document.getElementById('campoEndereco').value;

  return {
    tipo: "Passageiro",
    descricao: descricao,
    zonascarona: zonas,
    endereco: endereco
  };
}

// Função para validar se todos os campos obrigatórios foram preenchidos no formulário de passageiro
function validarCamposPassageiro(dados) {
  if (!dados.descricao || !dados.zonascarona || !dados.endereco) {
    return false; // Retorna false se algum campo estiver vazio
  }
  return true; // Retorna true se todos os campos estiverem preenchidos
}

// Função para salvar os dados no localStorage
function salvarNoLocalStorage(dados) {
  let posts = JSON.parse(localStorage.getItem('Posts')) || { PostsMotoristas: [], PostsPassageiros: [] };
  let id = posts.PostsPassageiros.length + 1; // Gerar um ID único para o novo post de passageiro

  let novoPost = {
    id: id,
    ...dados
  };

  posts.PostsPassageiros.push(novoPost);
  localStorage.setItem('Posts', JSON.stringify(posts));
}

// Função principal para cadastrar o post de passageiro
function cadastrarPostPassageiro(event) {
  event.preventDefault(); // Impede o envio padrão do formulário

  let dadosDoFormulario = capturarDadosDoFormularioPassageiro();

  if (validarCamposPassageiro(dadosDoFormulario)) {
    salvarNoLocalStorage(dadosDoFormulario);
    alert("Post de passageiro cadastrado com sucesso!");
    window.location.href = "./caronas.html"; // Redireciona para a página das caronas após o cadastro bem-sucedido
    // Limpar campos do formulário, se necessário
  } else {
    alert("Por favor, preencha todos os campos obrigatórios.");
  }
}

// Adiciona um evento de submit ao formulário de passageiro para chamar a função de cadastro
document.getElementById('formCadastroPostPassageiro').addEventListener('submit', cadastrarPostPassageiro);
