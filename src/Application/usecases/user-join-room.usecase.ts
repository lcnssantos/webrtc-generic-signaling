import { WebRTCContract } from '../interfaces/WebRTCContract'
import { RoomEntity } from '../../Domain/Entity/RoomEntity'
import { UserEntity } from '../../Domain/Entity/UserEntity'
import { GenericRepositoryContract } from '../interfaces/GenericRepositoryContract'

export class UserJoinRoomUseCase {
    private WebRTC: WebRTCContract
    private roomRepository: GenericRepositoryContract<RoomEntity>

    constructor (WebRTC: WebRTCContract, roomRepository: GenericRepositoryContract<RoomEntity>) {
      this.WebRTC = WebRTC
      this.roomRepository = roomRepository
    }

    async join (room: RoomEntity, user: UserEntity) {
      await this.WebRTC.joinRoom(room, user)
      room.addUser(user)
      await this.roomRepository.createOrUpdate(room.id, room)
    }
}
