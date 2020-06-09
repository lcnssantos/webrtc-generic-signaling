import { RoomEntity } from '../../../Domain/Entity/RoomEntity'
import { UserEntity } from '../../../Domain/Entity/UserEntity'
import { UserAlreadyInRoomError } from '../../../Domain/errors/user-already-in-room.error'
import { UserLeaveRoomUseCase } from '../../../Application/usecases/user-leave-room.usecase'
import { UserJoinRoomUseCase } from '../../../Application/usecases/user-join-room.usecase'
import { WebRTCMock } from '../mocks/WebRTCMock'
import { RepositoryInMemoryMock } from '../mocks/RepositoryInMemoryMock'

const getSut = () => {
  const userLeaveRoomUseCase = new UserLeaveRoomUseCase(new WebRTCMock(), new RepositoryInMemoryMock<RoomEntity>())
  const userJoinRoomUseCase = new UserJoinRoomUseCase(new WebRTCMock(), new RepositoryInMemoryMock<RoomEntity>())
  const room = new RoomEntity(10, 'any_id')
  const user = new UserEntity('any_id')
  return { userJoinRoomUseCase, userLeaveRoomUseCase, room, user }
}

/* describe('Should test userLeaveRoom usecase', () => {
  test('should put user inside room correctly', async () => {
    const { userJoinRoomUseCase, userLeaveRoomUseCase, user } = getSut()
    var { room } = getSut()

    await userJoinRoomUseCase.join(room, user)

    const usersInsideRoom = room.getUsers().length

    await userLeaveRoomUseCase.leave(room, user)

    expect(room.getUsers()).toHaveLength(usersInsideRoom - 1)
  })

  test('should thrown if user isnt at room', () => {

  })
}) */
