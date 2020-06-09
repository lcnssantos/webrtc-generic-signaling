import { WebRTCInterface } from '../interfaces/WebRTCInterface'
import { RoomEntity } from '../../Domain/Entity/RoomEntity'
import { UserEntity } from '../../Domain/Entity/UserEntity'

export class UserJoinRoomUseCase {
    private WebRTC: WebRTCInterface

    constructor (WebRTC: WebRTCInterface) {
      this.WebRTC = WebRTC
    }

    async join (room: RoomEntity, user: UserEntity) {
      await this.WebRTC.joinRoom(room, user)
      room.addUser(user)
    }
}
