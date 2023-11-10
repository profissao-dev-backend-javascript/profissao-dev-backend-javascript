// Importa e configura a lib dotenv para adicionar
// suporte ao arquivo .env na raiz do projeto
require('dotenv').config()

// Importa Express
const express = require('express')
const { connectToDatabase } = require('./db/database.helper')

// Import dos Routers
const itemRouter = require("./item/item.router")

// Declaramos a função main()
async function main() {
  // Conexão com o Banco de Dados
  await connectToDatabase()

  // Inicialização do express
  const app = express()

  // Sinalizar para o Express que o corpo
  // das requisições estará sempre em JSON
  app.use(express.json())

  // Rota Principal
  app.get('/', function (req, res) {
    res.send('Hello World')
  })

  // Rota Secundária
  app.get('/oi', function (req, res) {
    res.send('Olá, mundo!')
  })

  // Importamos o itemRouter
  app.use("/item", itemRouter)

  // Usamos a porta passada no .env.PORT ou a porta 3000
  const port = process.env.PORT || 3000

  // Subimos o servidor na porta indicada
  app.listen(port, function () {
    console.log(`App running on http://localhost:${port}`)
  })
}

// Executamos a função main()
main()
