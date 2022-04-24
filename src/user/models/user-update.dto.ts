import { IsEmail, IsNotEmpty } from "class-validator"

export class UserUpdateDto {
  firstName?: string
  lastName?: string
  email?: string
}