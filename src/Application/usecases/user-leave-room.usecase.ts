import { WebRTCInterface } from '../interfaces/WebRTCInterface'
import { RoomEntity } from '../../Domain/Entity/RoomEntity'
import { UserEntity } from '../../Domain/Entity/UserEntity'
import { RepositoryContract } from 'Application/interfaces/RepositoryInterface'

export class UserLeaveRoomUseCase {
  private WebRTC: WebRTCInterface
  private roomRepository: RepositoryContract<RoomEntity>

  constructor (WebRTC: WebRTCInterface, roomRepository: RepositoryContract<RoomEntity>) {
    this.WebRTC = WebRTC
    this.roomRepository = roomRepository
  }

  async leave (room: RoomEntity, user: UserEntity) {
  }
}
