import { RoomEntity } from '../../Domain/Entity/RoomEntity'
import { WebRTCContract } from '../interfaces/WebRTCContract'
import { GenericRepositoryContract } from '../interfaces/GenericRepositoryContract'
import { RoomAlreadyExistError } from '../../Domain/errors/room-already-exist.error'

export class CreateRoomUseCase {
    private WebRTC: WebRTCContract
    private roomRepository: GenericRepositoryContract<RoomEntity>

    constructor (WebRTC: WebRTCContract, roomRepository: GenericRepositoryContract<RoomEntity>) {
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
