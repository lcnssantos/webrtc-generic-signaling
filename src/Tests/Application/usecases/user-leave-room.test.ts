import { RoomEntity } from '../../../Domain/Entity/RoomEntity'
import { UserEntity } from '../../../Domain/Entity/UserEntity'
import { UserLeaveRoomUseCase } from '../../../Application/usecases/user-leave-room.usecase'
import { UserJoinRoomUseCase } from '../../../Application/usecases/user-join-room.usecase'
import { WebRTCMock } from '../mocks/WebRTCMock'
import { RepositoryInMemoryMock } from '../mocks/RepositoryInMemoryMock'
import { UserNotFoundError } from '../../../Domain/errors/user-not-found.error'

const getSut = () => {
  const repository = new RepositoryInMemoryMock<RoomEntity>()
  const userLeaveRoomUseCase = new UserLeaveRoomUseCase(new WebRTCMock(), repository)
  const userJoinRoomUseCase = new UserJoinRoomUseCase(new WebRTCMock(), repository)
  const room = new RoomEntity(10, 'any_id')
  const user = new UserEntity('any_id')
  return { userJoinRoomUseCase, userLeaveRoomUseCase, room, user, repository }
}

describe('Should test userLeaveRoom usecase', () => {
  test('should put user inside room correctly', async () => {
    const { userJoinRoomUseCase, userLeaveRoomUseCase, user, repository, room } = getSut()

    await userJoinRoomUseCase.join(room, user)

    const usersInsideRoom = await repository.find(room.id).getUsers().length

    await userLeaveRoomUseCase.leave(room, user)

    expect(await repository.find(room.id).getUsers()).toHaveLength(usersInsideRoom - 1)
  })

  test('should thrown if user isnt at room', () => {
    const { userJoinRoomUseCase, userLeaveRoomUseCase, user, repository, room } = getSut()

    return expect(userLeaveRoomUseCase.leave(room, user)).rejects.toBeInstanceOf(UserNotFoundError)
  })
})
