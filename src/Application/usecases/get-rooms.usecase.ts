import { RoomEntity } from '../../Domain/Entity/RoomEntity'
import { WebRTCContract } from '../interfaces/WebRTCContract'
import { GenericRepositoryContract } from '../interfaces/GenericRepositoryContract'
import { RoomAlreadyExistError } from '../../Domain/errors/room-already-exist.error'

export class GetRoomsUsecase {
    private roomRepository: GenericRepositoryContract<RoomEntity>

    constructor (roomRepository: GenericRepositoryContract<RoomEntity>) {
      this.roomRepository = roomRepository
    }

    async get (): Promise<Array<RoomEntity>> {
      return this.roomRepository.findAll()
    }
}
