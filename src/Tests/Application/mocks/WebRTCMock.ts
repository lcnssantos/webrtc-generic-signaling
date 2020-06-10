import { WebRTCContract } from '../../../Application/interfaces/WebRTCContract'
import { RoomEntity } from '../../../Domain/Entity/RoomEntity'
import { UserEntity } from '../../../Domain/Entity/UserEntity'

export class WebRTCMock implements WebRTCContract {
  async leaveRoom (room: RoomEntity, user: UserEntity) {

  }

  async createRoom (room: RoomEntity) {

  }

  async deleteRoom (room: RoomEntity) {
  }

  async joinRoom (room: RoomEntity, user: UserEntity) {
  }
}
