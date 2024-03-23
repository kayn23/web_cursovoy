import { useUserServerFind } from '~/composables/userServerFind'
import { useConnectionPool } from '~/db/dbConnection'
import { IUser } from '~/types/user.type'

export default eventHandler(async (event) => {
  const user = await useUserServerFind(event)
  if (user.role !== 'admin') return createError({ status: 403 })
  const id = getRouterParam(event, 'id')
  if (!id) return createError({ status: 400 })
  const { pool } = useConnectionPool()
  const [res] = await pool.query<IUser[]>(`
select * from persons where id = '${id}'
`)
  if (res.length !== 1) return createError({ status: 404 })
  return {
    user: res[0],
  }
})
