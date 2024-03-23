import { useUserServerFind } from '~/composables/userServerFind'
import { useUserSqlHelper } from '~/composables/userSqlHelper'
import { useConnectionPool } from '~/db/dbConnection'
import { IUser } from '~/types/user.type'

export default eventHandler(async (event) => {
  const user = await useUserServerFind(event)
  const { checkUserAdmin } = useUserSqlHelper()
  if (!checkUserAdmin(user)) {
    return createError({ status: 403, statusMessage: 'Forbidden' })
  }
  const { pool } = useConnectionPool()
  const { id } = getQuery(event)
  if (!id) return createError({ status: 404, statusText: 'Bad request' })
  const [users] = await pool.query<IUser[]>(`
select * from persons where email = '${id}'`)
  if (users.length !== 1) return createError({ status: 404, statusText: 'Bad email' })
  return {
    id: users[0].id,
  }
})
