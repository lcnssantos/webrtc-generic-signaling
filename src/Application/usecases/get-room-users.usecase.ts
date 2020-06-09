import { RoomEntity } from '../../Domain/Entity/RoomEntity'
import { WebRTCInterface } from '../interfaces/WebRTCInterface'
import { RepositoryContract } from '../interfaces/RepositoryInterface'
import { RoomAlreadyExistError } from '../../Domain/errors/room-already-exist.error'

export class GetRoomUsersUsecase {
    private WebRTC: WebRTCInterface
    private roomRepository: RepositoryContract<RoomEntity>

    constructor (WebRTC: WebRTCInterface, roomRepository: RepositoryContract<RoomEntity>) {
      this.WebRTC = WebRTC
      this.roomRepository = roomRepository
    }

    async get (room: RoomEntity) {

    }
}
