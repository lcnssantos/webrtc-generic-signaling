import { WebRTCContract } from '../interfaces/WebRTCContract'
import { GenericRepositoryContract } from '../interfaces/GenericRepositoryContract'
import { RoomEntity } from '../../Domain/Entity/RoomEntity'
import { RoomAlreadyExistError } from '../../Domain/errors/room-already-exist.error'
import { RoomNotFoundError } from '../../Domain/errors/room-not-found.error'
import { UserEntity } from '../../Domain/Entity/UserEntity'

export class RoomsUsecase {
    private WebRTC: WebRTCContract
    private roomRepository: GenericRepositoryContract<RoomEntity>

    constructor (WebRTC: WebRTCContract, roomRepository: GenericRepositoryContract<RoomEntity>) {
      this.WebRTC = WebRTC
      this.roomRepository = roomRepository
    }

    async create (id: string, maxUsers: number) {
      if (this.roomRepository.find(id)) {
        throw new RoomAlreadyExistError()
      } else {
        const room = new RoomEntity(maxUsers, id)
        await this.roomRepository.add(room)
        await this.WebRTC.createRoom(room)
      }
    }

    async delete (room: RoomEntity) {
      if (this.roomRepository.find(room.id)) {
        await this.WebRTC.deleteRoom(room)
        await this.roomRepository.delete(room.id)
      } else {
        throw new RoomNotFoundError()
      }
    }

    async getUsers (room: RoomEntity): Promise<Array<UserEntity>> {
      const roomData = this.roomRepository.find(room.id)
      return roomData.getUsers()
    }

    async get (): Promise<Array<RoomEntity>> {
      return this.roomRepository.findAll()
    }
}
