/*const jsonServer = require('json-server');
const path = require('path');
const cors = require('cors');

const server = jsonServer.create();
const router = jsonServer.router('./public/codigo/assets/json/db.json');
const middlewares = jsonServer.defaults();

// Middleware para permitir CORS
server.use(cors());

// Middleware padrão do JSON Server
server.use(middlewares);

// Rewriter de rotas para acessar posts de um usuário específico
server.use(jsonServer.rewriter({
  '/users/:userId/posts': '/posts?userId=:userId'
}));

// Servindo arquivos estáticos da pasta 'public'
server.use(jsonServer.defaults({ static: path.join(__dirname, 'public') }));

// Rota para servir o index.html
server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,  'pages', 'posts', 'filtros.html'));
});

// Usando o roteador do JSON Server
server.use(router);

// Iniciando o servidor na porta 3000
server.listen(3000, () => {
  console.log('JSON Server is running on http://localhost:3000');
});*/
