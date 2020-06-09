import { UserEntity } from './UserEntity'
import { FullRoomError } from '../errors/full-room.error'
import { UserAlreadyInRoomError } from '../errors/user-already-in-room.error'
import { UserNotFoundError } from '../errors/user-not-found.error'

export class RoomEntity {
    public id: string
    private maxUserNumber: number
    private users: Array<UserEntity>

    constructor (maxUserNumber: number, id: string) {
      this.maxUserNumber = maxUserNumber
      this.id = id
      this.users = []
    }

    addUser = (user: UserEntity) => {
      if (this.users.length < this.maxUserNumber) {
        if (this.users.find(userFind => userFind.getId() === user.getId())) {
          throw new UserAlreadyInRoomError()
        } else {
          this.users.push(user)
        }
      } else {
        throw new FullRoomError()
      }
    }

    removeUser = (user: UserEntity) => {
      if (this.hasUser(user)) {
        this.users = this.users.filter(actualUser => actualUser.getId() !== user.getId())
      } else {
        throw new UserNotFoundError()
      }
    }

    getUsers = (): Array<UserEntity> => {
      return this.users
    }

    hasUser = (user: UserEntity): Boolean => {
      return this.users.find(actualUser => actualUser.getId() === user.getId()) !== undefined
    }

    static fromRaw (data: {id: string, maxUserNumbers: number, users: Array<UserEntity>}) {
      const room = new this(data.maxUserNumbers, data.id)
      data.users.forEach(room.addUser)
      return room
    }

    public getSize () {
      return this.maxUserNumber
    }
}
