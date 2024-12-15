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
  exempt: boolean
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
  client_id?: number
}

export interface InvoiceDetail {
  invoice_id: number
  product_id: number
  quantity: number
  unit_price: number
  total_line: number
}

export interface ClientCreate {
  fullName: string
  identification: string
  phone?: string
}

export interface Commerce {
  name: string
  location?: string
  identification: string
}

export interface Recepter {
  name: string
  location?: string
  identification: string
}

export interface InvoicePDF {
  emitted: Commerce
  recepter: Recepter
  date: string
  number: number
  products: ProductDetailInvoice[]
  subtotal: number
  iva: number
  total: number
  id_invoice: number
}

export interface ListProduct {
  products: Product[]
}

export interface ProductDetailInvoice {
  code: string
  description: string
  quantity: number
  unit_price: number
  amount: number
}

export interface Product {
  id: number
  name: string
  quantity: number
  code: string
  image: string
  createdAt: string
  updatedAt: string
  price: string
  sellBy: string
}

export interface IvaCreate {
  value: number
  active: boolean
}

export interface CommerceCreate {
  name: string
  address: string
  phone: string
  identification: string
}

export interface PayDebt {
  payment_method: string
  num_operation: string
}
