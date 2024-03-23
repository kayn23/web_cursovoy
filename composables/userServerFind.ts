import type { EventHandlerRequest, H3Event } from 'h3'
import type { JwtPayload } from 'jsonwebtoken'
import type { RowDataPacket } from 'mysql2'
import jwt from 'jsonwebtoken'
import { useConnection } from '~/db/dbConnection'
import type { IUser } from '~/types/user.type'

export async function useUserServerFind(event: H3Event<EventHandlerRequest>) {
  const config = useRuntimeConfig()
  const token = getHeader(event, 'authorization')
  const { connection } = await useConnection()
  if (token) {
    const payload: JwtPayload = jwt.verify(token, config.jwtSecret) as JwtPayload
    const [result] = await connection.query<RowDataPacket[]>(`select * from persons where id = ${payload.userId}`)
    if (result.length !== 1) {
      throw createError({ statusCode: 404, statusMessage: 'Not found' })
    } else {
      return result[0] as IUser
    }
  } else {
    throw createError({ statusCode: 401, statusMessage: 'Unauzorization' })
  }
}
