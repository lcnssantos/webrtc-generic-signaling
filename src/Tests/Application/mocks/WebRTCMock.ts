import { WebRTCInterface } from '../../../Application/interfaces/WebRTCInterface'
import { RoomEntity } from '../../../Domain/Entity/RoomEntity'
import { UserEntity } from '../../../Domain/Entity/UserEntity'

export class WebRTCMock implements WebRTCInterface {
  async joinRoom (room: RoomEntity, user: UserEntity) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, 1)
    })
  }
}
