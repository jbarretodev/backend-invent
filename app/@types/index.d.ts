import User from '#models/user'
import dayjs from 'dayjs'

export interface UserCreate {
  fullName: string
  email: string
  password: string
}

export interface ActiveTokenDe {
  user: User
  expireAt: dayjs.Dayjs
}

export interface ProductCreate {
  name: string
  quantity: number
  code: string
  image?: string
}

export type ErrorOpeHistoryProduct = {
  errorOpe: boolean
  message: string
}

export interface HistoryProductCreate {
  quantity: number
  type_op: number
  product_id: number
  user_id: number
}
