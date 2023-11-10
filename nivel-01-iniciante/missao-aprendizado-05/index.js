// Importa e configura a lib dotenv para adicionar
// suporte ao arquivo .env na raiz do projeto
require('dotenv').config()

// Importa Express
const express = require('express')
const { connectToDatabase } = require('./db/database.helper')

// Declaramos a função main()
async function main() {
  // Conexão com o Banco de Dados
  const db = await connectToDatabase()
  const collection = db.collection('items')

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

  // CRUD de lista de DevMon

  // READ ALL - [GET] /items
  app.get("/items", async function (req, res) {
    // Acessamos a lista de documentos na collection do MongoDB
    const documents = await collection.find().toArray()

    // Exibimos esses documentos como JSON
    res.send(documents)
  })

  // READ BY ID - [GET] /items/:id
  app.get("/items/:id", async function (req, res) {
    // Acessamos o parâmetro de rota ID
    // Subtraímos 1 para corrigir a questão do índice
    // da lista que começa em 0
    const id = req.params.id

    // Acessamos o item na lista a partir do index
    // const item = items.find(function (elemento) {
    //   return elemento.id === id
    // })

    // Buscamos o documento na collection
    const item = await collection.findOne({
      _id: new ObjectId(id)
    })

    // Exibimos o item obtido
    res.send(item)
  })

  // CREATE - [POST] /items
  app.post("/items", async function (req, res) {
    // Extraio a informação do corpo da requisição
    const item = req.body

    // Validamos o corpo da requisição, garantindo que tem
    // as propriedades corretas
    if (!item || !item.name || !item.imageUrl) {
      return res.status(400).send({
        message: "name & imageUrl are required."
      })
    }

    // Calculamos o novo ID a partir da quantidade de itens na lista
    // item.id = items.length + 1

    // Insiro ela na lista
    // items.push(item)

    // Inserir o item na collection
    await collection.insertOne(item)

    // Enviamos uma mensagem de sucesso
    res.status(201).send(item)
  })

  // UPDATE - [PUT] /items/:id
  app.put("/items/:id", async function (req, res) {
    // Acessamos o parâmetro de rota e corrigimos o índice
    const id = req.params.id

    // Obtemos o novo item a partir do corpo da requisição
    const newItem = req.body

    // Colocamos o novo item na mesma posição do item anterior
    // const index = items.findIndex(function (elemento) {
    //   return elemento.id === id
    // })

    // Pegamos todas as propriedades do newItem e atualizamos
    // na lista, mantendo o ID atual
    // items[index] = {
    //   ...newItem,
    //   id,
    // }

    // Atualizar o documento na collection
    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: newItem }
    )

    // Enviamos uma mensagem de sucesso
    res.send(newItem)
  })

  // DELETE - [DELETE] /items/:id
  app.delete("/items/:id", async function (req, res) {
    // Acessamos o parâmetro de rota e corrigimos o índice
    const id = req.params.id

    // Buscamos o índice da lista para o elemento com o ID passado
    // const index = items.findIndex(function (element) {
    //   return elemento.id === id
    // })

    // Removemos a informação a partir do índice
    // delete items[index]

    await collection.deleteOne({ _id: new ObjectId(id) })

    // Enviamos uma mensagem de sucesso
    res.send("Item deleted successfully.")
  })

  // Usamos a porta passada no .env.PORT ou a porta 3000
  const port = process.env.PORT || 3000

  // Subimos o servidor na porta indicada
  app.listen(port, function () {
    console.log(`App running on http://localhost:${port}`)
  })
}

// Executamos a função main()
main()
