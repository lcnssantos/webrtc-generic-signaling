import { RoomEntity } from '../../Domain/Entity/RoomEntity'
import { WebRTCInterface } from '../interfaces/WebRTCInterface'
import { RepositoryContract } from '../interfaces/RepositoryInterface'
import { RoomAlreadyExistError } from '../../Domain/errors/room-already-exist.error'

export class CreateRoomUseCase {
    private WebRTC: WebRTCInterface
    private roomRepository: RepositoryContract<RoomEntity>

    constructor (WebRTC: WebRTCInterface, roomRepository: RepositoryContract<RoomEntity>) {
      this.WebRTC = WebRTC
      this.roomRepository = roomRepository
    }

    async createRoom (id: string, maxUsers: number) {
      if (this.roomRepository.find(id)) {
        throw new RoomAlreadyExistError()
      } else {
        const room = new RoomEntity(maxUsers, id)
        await this.roomRepository.add(room)
        await this.WebRTC.createRoom(room)
      }
    }
}
