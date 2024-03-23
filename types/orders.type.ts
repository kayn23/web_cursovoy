import type { RowDataPacket } from 'mysql2'
import type { IDeliveryPointDetails } from './deliveryPoint.type'
import type { IUser } from './user.type'

export interface IOrder {
  id: number
  sender: number
  recipient: number
  end_point: number
  price: number
  created_at: number
  ent_at: number
  cargo_id: number
}

export interface IOrderPreview extends IOrder, RowDataPacket {
  end_point_name: string
  recipient_name: string
  sender_name: string
}

export interface IOrderDetailed extends Omit<IOrder, 'sender' | 'recipient' | 'end_point'> {
  sender: IUser
  recipient: IUser
  end_point: IDeliveryPointDetails
}
