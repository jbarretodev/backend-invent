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
  price: number
  code: string
  image?: string
  sell_by?: string
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

export interface InvoiceCreate {
  user_id: number
  num_operation?: string
  payment_method: string
  status: boolean
  total_invoice: number
}

export interface InvoiceDetail {
  invoice_id: number
  product_id: number
  quantity: number
  unit_price: number
  total_line: number
}
