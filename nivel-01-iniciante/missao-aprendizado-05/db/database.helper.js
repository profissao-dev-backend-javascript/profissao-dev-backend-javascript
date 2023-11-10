const { MongoClient } = require('mongodb')

async function connectToDatabase() {
  // Preparamos as informações do Banco de Dados
  const url = process.env.DATABASE_URL
  const client = new MongoClient(url)
  const dbName = 'db-semana-backend-javascript'

  // Conexão com Banco de Dados
  console.info("Connecting to database...")
  await client.connect()
  console.info("Database connected successfully!")

  const db = client.db(dbName)

  return db
}

module.exports = {
  connectToDatabase,
}
