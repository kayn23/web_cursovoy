import { useConnection } from '~/db/dbConnection'
import { IUser } from '~/types/user.type'
import jwt from 'jsonwebtoken'
import { ResultSetHeader } from 'mysql2'

export default eventHandler<{ body: { user: Omit<IUser, 'id'> } }>(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const { connection } = await useConnection()
  const [result] = await connection.query<ResultSetHeader>(
    `insert into persons (name, lastName, phone, documentNumber, email, password) values ('${body.user.name}','${body.user.lastName}','${body.user.phone}','${body.user.documentNumber}','${body.user.email}','${body.user.password}')`,
  )
  setResponseStatus(event, 201)
  return {
    token: jwt.sign(
      {
        userId: result.insertId,
      },
      config.jwtSecret,
    ),
    id: result.insertId,
  }
})
