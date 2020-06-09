import { RoomEntity } from '../../Domain/Entity/RoomEntity'
import { UserEntity } from '../../Domain/Entity/UserEntity'

export interface WebRTCInterface {
    joinRoom(room: RoomEntity, user: UserEntity);
    leaveRoom(room: RoomEntity, user: UserEntity);
    createRoom(room: RoomEntity)
    deleteRoom(room: RoomEntity)
}
