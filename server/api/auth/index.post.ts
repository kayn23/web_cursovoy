import { RowDataPacket } from 'mysql2'
import { useConnection } from '~/db/dbConnection'
import { IUser } from '~/types/user.type'
import jwt from 'jsonwebtoken'

export default eventHandler<{ body: { user: Pick<IUser, 'password' | 'email'> } }>(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const { pool } = await useConnection()
  const [row, fields] = await pool.query<RowDataPacket[]>(
    `select * from persons where email = '${body.user.email}' and password = '${body.user.password}'`
  )
  if (row.length === 1) {
    setResponseStatus(event, 200)
    return {
      token: jwt.sign(
        {
          userId: row[0].id,
        },
        config.jwtSecret
      ),
      id: row[0].id,
    }
  } else {
    setResponseStatus(event, 401)
    return {
      errors: 'Bad credentials',
    }
  }
})
