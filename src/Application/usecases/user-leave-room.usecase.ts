import { WebRTCContract } from '../interfaces/WebRTCContract'
import { RoomEntity } from '../../Domain/Entity/RoomEntity'
import { UserEntity } from '../../Domain/Entity/UserEntity'
import { GenericRepositoryContract } from 'Application/interfaces/GenericRepositoryContract.js'

export class UserLeaveRoomUseCase {
  private WebRTC: WebRTCContract
  private roomRepository: GenericRepositoryContract<RoomEntity>

  constructor (WebRTC: WebRTCContract, roomRepository: GenericRepositoryContract<RoomEntity>) {
    this.WebRTC = WebRTC
    this.roomRepository = roomRepository
  }

  async leave (room: RoomEntity, user: UserEntity) {
    this.WebRTC.leaveRoom(room, user)
    room.removeUser(user)
    await this.roomRepository.createOrUpdate(room.id, room)
  }
}
