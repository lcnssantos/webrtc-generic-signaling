import { WebRTCInterface } from '../interfaces/WebRTCInterface'
import { RepositoryContract } from '../interfaces/RepositoryInterface'
import { RoomEntity } from '../../Domain/Entity/RoomEntity'
import { RoomNotFoundError } from '../../Domain/errors/room-not-found.error'

export class DeleteRoomUseCase {
    private WebRTC: WebRTCInterface
    private roomRepository: RepositoryContract<RoomEntity>

    constructor (WebRTC: WebRTCInterface, roomRepository: RepositoryContract<RoomEntity>) {
      this.WebRTC = WebRTC
      this.roomRepository = roomRepository
    }

    async delete (room: RoomEntity) {
      if (this.roomRepository.find(room.id)) {
        await this.WebRTC.deleteRoom(room)
        await this.roomRepository.delete(room.id)
      } else {
        throw new RoomNotFoundError()
      }
    }
}
