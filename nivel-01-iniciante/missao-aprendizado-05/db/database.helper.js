const { MongoClient } = require('mongodb')

// Preparamos as informações do Banco de Dados
const url = process.env.DATABASE_URL
const client = new MongoClient(url)
const dbName = 'db-semana-backend-javascript'

async function connectToDatabase() {
  // Conexão com Banco de Dados
  console.info("Connecting to database...")
  await client.connect()
  console.info("Database connected successfully!")
}

function getDatabase() {
  return client.db(dbName)
}

module.exports = {
  connectToDatabase,
  getDatabase,
}
