import { WebRTCInterface } from '../interfaces/WebRTCInterface'
import { RoomEntity } from '../../Domain/Entity/RoomEntity'
import { UserEntity } from '../../Domain/Entity/UserEntity'
import { RepositoryContract } from 'Application/interfaces/RepositoryInterface'

export class UserJoinRoomUseCase {
    private WebRTC: WebRTCInterface
    private roomRepository: RepositoryContract<RoomEntity>

    constructor (WebRTC: WebRTCInterface, roomRepository: RepositoryContract<RoomEntity>) {
      this.WebRTC = WebRTC
      this.roomRepository = roomRepository
    }

    async join (room: RoomEntity, user: UserEntity) {
      await this.WebRTC.joinRoom(room, user)
      room.addUser(user)
      await this.roomRepository.createOrUpdate(room.id, room)
    }
}
