import { useConnection } from '~/db/dbConnection'

export default defineEventHandler(async (event) => {
  const { connection } = await useConnection()
  const [result, field] = await connection.query('select * from persons')
  return {
    result,
  }
})
