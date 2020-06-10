import { RoomEntity } from '../../Domain/Entity/RoomEntity'
import { WebRTCContract } from '../interfaces/WebRTCContract'
import { GenericRepositoryContract } from '../interfaces/GenericRepositoryContract'
import { RoomAlreadyExistError } from '../../Domain/errors/room-already-exist.error'
import { UserEntity } from '../../Domain/Entity/UserEntity'

export class GetRoomUsersUseCase {
    private roomRepository: GenericRepositoryContract<RoomEntity>

    constructor (roomRepository: GenericRepositoryContract<RoomEntity>) {
      this.roomRepository = roomRepository
    }

    async get (room: RoomEntity): Promise<Array<UserEntity>> {
      const roomData = this.roomRepository.find(room.id)
      return roomData.getUsers()
    }
}
