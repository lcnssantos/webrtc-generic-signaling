import { WebRTCContract } from '../interfaces/WebRTCContract'
import { GenericRepositoryContract } from '../interfaces/GenericRepositoryContract'
import { RoomEntity } from '../../Domain/Entity/RoomEntity'
import { RoomNotFoundError } from '../../Domain/errors/room-not-found.error'

export class DeleteRoomUseCase {
    private WebRTC: WebRTCContract
    private roomRepository: GenericRepositoryContract<RoomEntity>

    constructor (WebRTC: WebRTCContract, roomRepository: GenericRepositoryContract<RoomEntity>) {
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
