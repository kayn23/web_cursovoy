export interface IDeliveryPoint {
  id: number | string
  name: string
  capacity: number
  citi_id: number
}

export interface IDeliveryPointDetails extends IDeliveryPoint {
  city: number
}
