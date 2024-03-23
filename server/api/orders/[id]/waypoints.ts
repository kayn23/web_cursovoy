import { useUserServerFind } from '~/composables/userServerFind'
import { useConnectionPool } from '~/db/dbConnection'
import { IWaypointsListItem } from '~/types/waypoint.type'

export default eventHandler(async (event) => {
  await useUserServerFind(event)
  const { pool } = useConnectionPool()
  const id = getRouterParam(event, 'id')
  const [waypoints] = await pool.query(`
select w.*, 
(select concat(dp.name, ' ', c.name) from deliveryPoints as dp left join cityes as c on dp.city_id = c.id where dp.id = w.start_point) as end_point_name,
(select concat(dp.name, ' ', c.name) from deliveryPoints as dp left join cityes as c on dp.city_id = c.id where dp.id = w.end_point) as start_point_name
from waypoints as w
where w.order_id = ${id}
`)
  return {
    waypoints: waypoints as IWaypointsListItem[],
  }
})
