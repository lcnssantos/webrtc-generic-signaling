import { WebRTCInterface } from '../../../Application/interfaces/WebRTCInterface'
import { RoomEntity } from '../../../Domain/Entity/RoomEntity'
import { UserEntity } from '../../../Domain/Entity/UserEntity'

export class WebRTCMock implements WebRTCInterface {
  leaveRoom (room: RoomEntity, user: UserEntity) {
    throw new Error('Method not implemented.')
  }

  createRoom (room: RoomEntity) {
    throw new Error('Method not implemented.')
  }

  deleteRoom (room: RoomEntity) {
    throw new Error('Method not implemented.')
  }

  async joinRoom (room: RoomEntity, user: UserEntity) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, 1)
    })
  }
}
