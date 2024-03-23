import type { RowDataPacket } from 'mysql2'

export interface IUser extends RowDataPacket {
  id: number | string
  name: string
  lastName: string
  phone: string
  documentNumber: string
  email: string
  password?: string
  role: string
}

/*
id	int Автоматическое приращение	
name	varchar(255)	
lastName	varchar(255)	
phone	varchar(255)	
documentNumber	varchar(255)	
email
*/
