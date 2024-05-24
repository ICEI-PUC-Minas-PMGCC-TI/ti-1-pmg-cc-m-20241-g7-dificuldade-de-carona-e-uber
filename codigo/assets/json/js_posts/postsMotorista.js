// Função para capturar os dados do formulário de motorista
function capturarDadosDoFormularioMotorista() {
  let descricao = document.getElementById('campoDescricao').value;
  let valor = document.getElementById('campoValorCorrida').value;
  let zonas = document.getElementById('campoZonas').value;
  let endereco = document.getElementById('campoEndereco').value;

  return {
    tipo: "Motorista",
    descricao: descricao,
    valor: valor,
    zonascarona: zonas,
    endereco: endereco
  };
}

// Função para validar se todos os campos obrigatórios foram preenchidos
function validarCampos(dados) {
  if (!dados.descricao || !dados.valor || !dados.zonascarona || !dados.endereco) {
    return false; // Retorna false se algum campo estiver vazio
  }
  return true; // Retorna true se todos os campos estiverem preenchidos
}

// Função para salvar os dados no localStorage
function salvarNoLocalStorage(dados) {
  let posts = JSON.parse(localStorage.getItem('Posts')) || { PostsMotoristas: [], PostsPassageiros: [] };
  let id = posts.PostsMotoristas.length + 1; // Gerar um ID único para o novo post

  let novoPost = {
    id: id,
    ...dados
  };

  posts.PostsMotoristas.push(novoPost);
  localStorage.setItem('Posts', JSON.stringify(posts));
}

// Função principal para cadastrar o post de motorista
function cadastrarPostMotorista(event) {
  event.preventDefault(); // Impede o envio padrão do formulário

  let dadosDoFormulario = capturarDadosDoFormularioMotorista();

  if (validarCampos(dadosDoFormulario)) {
    salvarNoLocalStorage(dadosDoFormulario);
    alert("Post de motorista cadastrado com sucesso!");
    window.location.href = "./caronas.html"; // Redireciona para a página das caronas após o cadastro bem-sucedido
    // Limpar campos do formulário, se necessário
  } else {
    alert("Por favor, preencha todos os campos obrigatórios.");
  }
}

// Adiciona um evento de submit ao formulário de motorista para chamar a função de cadastro
document.getElementById('formCadastroPostMotorista').addEventListener('submit', cadastrarPostMotorista);
