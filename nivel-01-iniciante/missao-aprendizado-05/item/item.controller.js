const { ObjectId } = require("mongodb")
const { getDatabase } = require("../db/database.helper")

function getCollection() {
  return getDatabase().collection('items')
}

async function readAll(req, res) {
  // Acessamos a lista de documentos na collection do MongoDB
  const documents = await getCollection().find().toArray()

  // Exibimos esses documentos como JSON
  res.send(documents)
}

async function readById(req, res) {
  // Acessamos o parâmetro de rota ID
  // Subtraímos 1 para corrigir a questão do índice
  // da lista que começa em 0
  const id = req.params.id

  // Buscamos o documento na collection
  const item = await getCollection().findOne({
    _id: new ObjectId(id)
  })

  // Exibimos o item obtido
  res.send(item)
}

async function create(req, res) {
  // Extraio a informação do corpo da requisição
  const item = req.body

  // Validamos o corpo da requisição, garantindo que tem
  // as propriedades corretas
  if (!item || !item.name || !item.imageUrl) {
    return res.status(400).send({
      message: "name & imageUrl are required."
    })
  }

  // Inserir o item na collection
  await getCollection().insertOne(item)

  // Enviamos uma mensagem de sucesso
  res.status(201).send(item)
}

async function updateById(req, res) {
  // Acessamos o parâmetro de rota e corrigimos o índice
  const id = req.params.id

  // Obtemos o novo item a partir do corpo da requisição
  const newItem = req.body

  // Atualizar o documento na collection
  await getCollection().updateOne(
    { _id: new ObjectId(id) },
    { $set: newItem }
  )

  // Enviamos uma mensagem de sucesso
  res.send(newItem)
}

async function deleteById(req, res) {
  // Acessamos o parâmetro de rota e corrigimos o índice
  const id = req.params.id

  // Removemos o documento no MongoDB a partir do ID
  await getCollection().deleteOne({ _id: new ObjectId(id) })

  // Enviamos uma mensagem de sucesso
  res.send("Item deleted successfully.")
}

module.exports = {
  readAll,
  readById,
  create,
  updateById,
  deleteById,
}