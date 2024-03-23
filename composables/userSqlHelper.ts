import { useConnectionPool } from '~/db/dbConnection'
import type { IUser } from '~/types/user.type'

export function useUserSqlHelper() {
  const { pool } = useConnectionPool()
  async function findUser(id: number | string) {
    return await pool.query(`select *, '' as password from persons where id = ${id}`)
  }
  function checkUserAdmin(user: IUser): boolean {
    return user.role === 'admin'
  }
  return { findUser, checkUserAdmin }
}
