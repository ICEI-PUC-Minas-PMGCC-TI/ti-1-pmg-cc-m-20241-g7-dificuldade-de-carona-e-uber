const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('./public/assets/json/db.json')

const middlewares = jsonServer.defaults({
    readOnly: false 
  });

server.use(middlewares)
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server está em execução!')
})