fetch('http://localhost:3000/posts')
  .then(response => response.json())
  .then(data => {
  })
  .catch(error => console.error('Erro ao carregar o JSON:', error));


document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("cadastroCarroForm");
    const btnCadastrarEditar = document.getElementById("btnCadastrarCarro");
    let carro = JSON.parse(localStorage.getItem("carro")) || {};
  
    function preencherForm() {
      document.getElementById("placa").value = carro.placa || "";
      document.getElementById("marca").value = carro.marca || "";
      document.getElementById("modelo").value = carro.modelo || "";
      document.getElementById("ano").value = carro.ano || "";
    }
  
    function salvarCarro() {
      localStorage.setItem("carro", JSON.stringify(carro));
    }
  
    preencherForm();
  
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      const placa = document.getElementById("placa").value;
      const marca = document.getElementById("marca").value;
      const modelo = document.getElementById("modelo").value;
      const ano = document.getElementById("ano").value;
  
      if (!placa || !marca || !modelo || !ano) {
        alert("Por favor, preencha todos os campos.");
        return;
      }
  
      carro = { placa, marca, modelo, ano };
      salvarCarro();
  
      btnCadastrarEditar.innerText = "Editar";
      btnCadastrarEditar.removeEventListener("click", cadastrarCarro);
      btnCadastrarEditar.addEventListener("click", editarCarro);
    });
  
    function cadastrarCarro() {
      form.reset();
      btnCadastrarEditar.innerText = "Cadastrar";
      btnCadastrarEditar.removeEventListener("click", editarCarro);
      btnCadastrarEditar.addEventListener("click", salvarCarro);
      carro = {};
      salvarCarro();
    }
  
    function editarCarro() {
      form.reset();
      btnCadastrarEditar.innerText = "Cadastrar";
      btnCadastrarEditar.removeEventListener("click", editarCarro);
      btnCadastrarEditar.addEventListener("click", salvarCarro);
    }
  
    if (carro.placa || carro.marca || carro.modelo || carro.ano) {
      btnCadastrarEditar.innerText = "Editar";
      btnCadastrarEditar.removeEventListener("click", cadastrarCarro);
      btnCadastrarEditar.addEventListener("click", editarCarro);
    }
  });
  
