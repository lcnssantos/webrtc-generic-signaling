import { RoomEntity } from '../../../Domain/Entity/RoomEntity'
import { UserEntity } from '../../../Domain/Entity/UserEntity'
import { WebRTCMock } from '../mocks/WebRTCMock'
import { RepositoryInMemoryMock } from '../mocks/RepositoryInMemoryMock'
import { UserNotFoundError } from '../../../Domain/errors/user-not-found.error'
import { UserUsecases } from '../../../Application/usecases/user.usecases'

const getSut = () => {
  const repository = new RepositoryInMemoryMock<RoomEntity>()
  const userUseCase = new UserUsecases(new WebRTCMock(), repository)
  const room = new RoomEntity(10, 'any_id')
  const user = new UserEntity('any_id')
  return { userUseCase, room, user, repository }
}

describe('Should test userLeaveRoom usecase', () => {
  test('should put user inside room correctly', async () => {
    const { userUseCase, user, repository, room } = getSut()

    await userUseCase.joinRoom(room, user)

    const usersInsideRoom = await repository.find(room.id).getUsers().length

    await userUseCase.leaveRoom(room, user)

    expect(await repository.find(room.id).getUsers()).toHaveLength(usersInsideRoom - 1)
  })

  test('should thrown if user isnt at room', () => {
    const { userUseCase, user, repository, room } = getSut()

    return expect(userUseCase.leaveRoom(room, user)).rejects.toBeInstanceOf(UserNotFoundError)
  })
})
