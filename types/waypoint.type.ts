import type { IDeliveryPointDetails } from './deliveryPoint.type'

export interface IWaypoints {
  id: string | number
  start_point: number
  end_point: number
  created_ad: string
  executor_id: number
  finished: boolean
  order_id: number
}

export interface IWaypointsDetails extends Omit<IWaypoints, 'end_point' | 'start_point'> {
  end_point: IDeliveryPointDetails
  start_point: IDeliveryPointDetails
}

export interface IWaypointsListItem extends IWaypoints {
  end_point_name: string
  start_point_name: string
}
