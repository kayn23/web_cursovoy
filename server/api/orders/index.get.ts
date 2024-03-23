import { useUserServerFind } from '~/composables/userServerFind'
import { useConnection } from '~/db/dbConnection'
import { IOrderPreview } from '~/types/orders.type'

type totalType = {
  total: number
}
export default eventHandler(async (event) => {
  let user = await useUserServerFind(event)
  const { connection } = await useConnection()

  const query = getQuery(event)
  if (query.user_id && user.role === 'admin') {
    user.id = query.user_id as string
  }
  const [totalRos] = await connection.query(
    `select count(*) as total from orders where sender = '${user.id}' or recipient = '${user.id}'`,
  )
  console.log(user.id)
  const [orders] = await connection.query<IOrderPreview[]>(
    `select o.*, 
(select concat(name, ' ', lastName) from persons as p where id = o.sender) as sender_name,
(select concat(name, ' ', lastName) from persons as p where id = o.recipient) as recipient_name,
(select concat(dp.name, ' ', c.name) from deliveryPoints as dp left join cityes as c on dp.city_id = c.id where dp.id = o.end_point ) as end_point_name
from orders as o where sender = '${user.id}' or recipient = '${user.id}'`,
  )

  // const total = Math.ceil(((totalRos as totalType[])[0]?.total || 1) / 10)

  return {
    value: orders,
  }
})
