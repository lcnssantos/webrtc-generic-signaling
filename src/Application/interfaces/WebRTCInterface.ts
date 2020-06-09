import { RoomEntity } from '../../Domain/Entity/RoomEntity'
import { UserEntity } from '../../Domain/Entity/UserEntity'

export interface WebRTCInterface {
    joinRoom(room: RoomEntity, user: UserEntity);
}
