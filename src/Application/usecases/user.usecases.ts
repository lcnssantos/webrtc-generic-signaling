import { WebRTCContract } from '../interfaces/WebRTCContract'
import { GenericRepositoryContract } from '../interfaces/GenericRepositoryContract'
import { RoomEntity } from '../../Domain/Entity/RoomEntity'
import { UserEntity } from '../../Domain/Entity/UserEntity'

export class UserUsecases {
    private WebRTC: WebRTCContract
    private roomRepository: GenericRepositoryContract<RoomEntity>

    constructor (WebRTC: WebRTCContract, roomRepository: GenericRepositoryContract<RoomEntity>) {
      this.WebRTC = WebRTC
      this.roomRepository = roomRepository
    }

    async joinRoom (room: RoomEntity, user: UserEntity) {
      await this.WebRTC.joinRoom(room, user)
      room.addUser(user)
      await this.roomRepository.createOrUpdate(room.id, room)
    }

    async leaveRoom (room: RoomEntity, user: UserEntity) {
      this.WebRTC.leaveRoom(room, user)
      room.removeUser(user)
      await this.roomRepository.createOrUpdate(room.id, room)
    }
}
