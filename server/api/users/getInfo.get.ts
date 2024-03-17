import { useConnection } from '~/db/dbConnection'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { RowDataPacket } from 'mysql2'

export default eventHandler(async (event) => {
  const config = useRuntimeConfig()
  const token = getHeader(event, 'authorization')
  const { connection } = await useConnection()
  if (token) {
    const payload: JwtPayload = jwt.verify(token, config.jwtSecret) as JwtPayload
    const [result] = await connection.query<RowDataPacket[]>(
      `select id, name, lastName, email, phone, role from persons where id = ${payload.userId}`,
    )
    if (result.length !== 1) {
      throw createError({ statusCode: 404, statusMessage: 'Not found' })
    } else {
      return {
        user: {
          ...result[0],
        },
      }
    }
  } else {
    throw createError({ statusCode: 401, statusMessage: 'Unauzorized' })
  }
})
