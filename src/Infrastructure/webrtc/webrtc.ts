import { WebRTCContract } from '../../Application/interfaces/WebRTCContract'
import { RoomEntity } from '../../Domain/Entity/RoomEntity'
import { UserEntity } from '../../Domain/Entity/UserEntity'
import { WebRTCSFU } from './interfaces/webRTCSFU'

export class WebRTC implements WebRTCContract {
    private sfu: WebRTCSFU

    constructor (sfu: WebRTCSFU) {
      this.sfu = sfu
    }

    createRoom (room: RoomEntity) {
    }

    deleteRoom (room: RoomEntity) {
    }

    joinRoom (room: RoomEntity, user: UserEntity) {
    }

    leaveRoom (room: RoomEntity, user: UserEntity) {
    }
}
