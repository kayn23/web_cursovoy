import mysql from 'mysql2/promise'

export async function useConnection() {
  const config = useRuntimeConfig()
  const connection = await mysql.createConnection({
    host: config.dbHost,
    user: config.dbUser,
    password: config.dbPassword,
    // database: 'deliveryService',
    database: 'delivery_control_system',
  })
  const pool = mysql.createPool({
    host: config.dbHost,
    user: config.dbUser,
    password: config.dbPassword,
    // database: 'deliveryService',
    database: 'delivery_control_system',
  })
  return {
    connection,
    pool,
  }
}
export function useConnectionPool() {
  const config = useRuntimeConfig()
  const pool = mysql.createPool({
    host: config.dbHost,
    user: config.dbUser,
    password: config.dbPassword,
    // database: 'deliveryService',
    database: 'delivery_control_system',
  })
  return { pool }
}
