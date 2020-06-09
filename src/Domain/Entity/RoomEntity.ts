import { UserEntity } from './UserEntity'
import { FullRoomError } from '../errors/full-room.error'
import { UserAlreadyInRoomError } from '../errors/user-already-in-room.error'

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
        if (this.users.find(userFind => userFind.id === user.id)) {
          throw new UserAlreadyInRoomError()
        } else {
          this.users.push(user)
        }
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

    static fromRaw (data: {id: string, maxUserNumbers: number, users: Array<UserEntity>}) {
      const room = new this(data.maxUserNumbers, data.id)
      data.users.forEach(room.addUser)
      return room
    }

    public getId () {
      return this.id
    }

    public getSize () {
      return this.maxUserNumber
    }
}
