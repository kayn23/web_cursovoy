import { RowDataPacket } from 'mysql2'
import { useUserServerFind } from '~/composables/userServerFind'
import { useUserSqlHelper } from '~/composables/userSqlHelper'
import { useConnectionPool } from '~/db/dbConnection'

type findType = {
  count: number
}
export default eventHandler(async (event) => {
  const user = await useUserServerFind(event)
  const { checkUserAdmin } = useUserSqlHelper()
  if (!checkUserAdmin(user)) {
    return createError({ status: 403, statusMessage: 'Forbidden' })
  }
  const { pool } = useConnectionPool()
  const { id } = getQuery(event)
  if (!id) return createError({ status: 404 })
  const [orders] = await pool.query<RowDataPacket[]>(`select count(*) as count from orders where id = ${id}`)
  const find = orders[0] as findType
  if (find.count !== 1) return createError({ status: 404 })
  return {
    id,
  }
})
