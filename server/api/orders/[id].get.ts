import { RowDataPacket } from 'mysql2'
import { useUserServerFind } from '~/composables/userServerFind'
import { useUserSqlHelper } from '~/composables/userSqlHelper'
import { useConnection } from '~/db/dbConnection'
import { IOrder } from '~/types/orders.type'
import { IUser } from '~/types/user.type'

export default eventHandler(async (event) => {
  const user = await useUserServerFind(event)
  const { connection } = await useConnection()
  const { findUser } = useUserSqlHelper()
  const id = getRouterParam(event, 'id')
  let sql = `select * from orders where id = ${id}`
  if (user.role !== 'admin') {
    sql += ` and (sender = ${user.id} or recipient = ${user.id})`
  }
  const [orders] = await connection.query<RowDataPacket[]>(sql)
  if (orders.length === 0) return createError({ status: 403 })
  const order = (orders as IOrder[])[0]
  const [senders] = await findUser(order.sender)
  const sender = (senders as IUser[])[0]
  const [recipients] = await findUser(order.recipient)
  const recipient = (recipients as IUser[])[0]
  const [endPoints] = await connection.query(
    `select *, dp.name as name, c.name as city from deliveryPoints as dp left join cityes as c on c.id = dp.city_id where dp.id = ${order.end_point}`,
  )
  const endPoint = (endPoints as any[])[0]
  return {
    order: {
      ...order,
      sender,
      recipient,
      end_point: endPoint,
    },
  }
})
