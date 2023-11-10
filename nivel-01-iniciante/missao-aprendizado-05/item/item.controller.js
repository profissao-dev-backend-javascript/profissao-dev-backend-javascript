const { ObjectId } = require("mongodb")

const service = require("./item.service")

async function readAll(req, res) {
  // Acessamos a lista de documentos no Service
  const documents = await service.readAll()

  // Exibimos esses documentos como JSON
  res.send(documents)
}

async function readById(req, res) {
  // Acessamos o parâmetro de rota ID
  // Subtraímos 1 para corrigir a questão do índice
  // da lista que começa em 0
  const id = req.params.id

  // Buscamos o documento via service
  const item = await service.readById(id)

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

  // Inserir o item via service
  await service.create(item)

  // Exibimos o item criado
  res.status(201).send(item)
}

async function updateById(req, res) {
  // Acessamos o parâmetro de rota e corrigimos o índice
  const id = req.params.id

  // Obtemos o novo item a partir do corpo da requisição
  const newItem = req.body

  // Validamos o corpo da requisição, garantindo que tem
  // as propriedades corretas
  if (!newItem || !newItem.name || !newItem.imageUrl) {
    return res.status(400).send({
      message: "name & imageUrl are required."
    })
  }

  // Atualizar o documento via service
  await service.updateById(id, newItem)

  // Exibimos o item atualizado
  res.send(newItem)
}

async function deleteById(req, res) {
  // Acessamos o parâmetro de rota e corrigimos o índice
  const id = req.params.id

  // Removemos o documento no MongoDB a partir do ID
  await service.deleteById(id)

  // Retornamos o status 204 (No Content) indicando
  // que deu certo
  res.status(204).send()
}

module.exports = {
  readAll,
  readById,
  create,
  updateById,
  deleteById,
}