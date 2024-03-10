import User from "#models/user"
import dayjs from "dayjs"

export interface UserCreate {
  fullName: string
  email: string
  password: string
}

export interface ActiveTokenDe {
  user: User,
  expireAt: dayjs.Dayjs
}
