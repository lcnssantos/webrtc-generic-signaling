import { WebRTCContract } from '../../Application/interfaces/WebRTCContract'
import { RoomEntity } from '../../Domain/Entity/RoomEntity'
import { UserEntity } from '../../Domain/Entity/UserEntity'
import { WebRTCSFUContract } from './interfaces/webRTCSFUContract'

export class WebRTC implements WebRTCContract {
    private sfu: WebRTCSFUContract

    constructor (sfu: WebRTCSFUContract) {
      this.sfu = sfu
    }

    createRoom (room: RoomEntity) {
      this.sfu.createRoom(room.id)
    }

    deleteRoom (room: RoomEntity) {
    }

    joinRoom (room: RoomEntity, user: UserEntity) {

    }

    leaveRoom (room: RoomEntity, user: UserEntity) {
    }
}
