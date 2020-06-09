import { UserEntity } from './UserEntity'
import { FullRoomError } from '../errors/full-room.error'

export class RoomEntity {
    private id: string
    private maxUserNumber: number
    private users: Array<UserEntity>

    constructor (maxUserNumber: number, id: string) {
      this.maxUserNumber = maxUserNumber
      this.id = id
      this.users = []
    }

    addUser = (user: UserEntity) => {
      if (this.users.length < this.maxUserNumber) {
        this.users.push(user)
      } else {
        throw new FullRoomError()
      }
    }

    removeUser = (user: UserEntity) => {
      this.users = this.users.filter(actualUser => actualUser.id !== user.id)
    }

    getUsers = (): Array<UserEntity> => {
      return this.users
    }

    hasUser = (user: UserEntity): Boolean => {
      return this.users.find(actualUser => actualUser.id === user.id) !== undefined
    }
}
