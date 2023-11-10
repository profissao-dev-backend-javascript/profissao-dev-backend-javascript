const { ObjectId } = require("mongodb")
const { getDatabase } = require("../db/database.helper")

function getCollection() {
  return getDatabase().collection('items')
}

async function readAll() {
  // Acessamos a lista de documentos na collection do MongoDB
  const documents = await getCollection().find().toArray()

  // Retornamos esses documentos
  return documents
}

async function readById(id) {
  // Buscamos o documento na collection
  const item = await getCollection().findOne({
    _id: new ObjectId(id)
  })

  // Retornamos o item obtido
  return item
}

async function create(item) {
  // Inserir o item na collection
  await getCollection().insertOne(item)

  // Retornamos o item criado
  return item
}

async function updateById(id, newItem) {
  // Atualizar o documento na collection
  await getCollection().updateOne(
    { _id: new ObjectId(id) },
    { $set: newItem }
  )

  // Retornamos o item atualizado
  return newItem
}

// TODO: Verificar se podemos deixar sem retorno
async function deleteById(id) {
  // Removemos o documento no MongoDB a partir do ID
  await getCollection().deleteOne({ _id: new ObjectId(id) })

  // TODO: Verificar o retorno da operação deleteOne
}

module.exports = {
  readAll,
  readById,
  create,
  updateById,
  deleteById,
}