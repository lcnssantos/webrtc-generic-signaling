import { RoomEntity } from '../../Domain/Entity/RoomEntity'
import { WebRTCInterface } from '../interfaces/WebRTCInterface'
import { RepositoryContract } from '../interfaces/RepositoryInterface'
import { RoomAlreadyExistError } from '../../Domain/errors/room-already-exist.error'

export class GetRoomsUsecase {
    private roomRepository: RepositoryContract<RoomEntity>

    constructor (roomRepository: RepositoryContract<RoomEntity>) {
      this.roomRepository = roomRepository
    }

    async get (): Promise<Array<RoomEntity>> {
      return this.roomRepository.findAll()
    }
}
