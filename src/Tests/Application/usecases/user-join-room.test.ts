import { RoomEntity } from '../../../Domain/Entity/RoomEntity'
import { UserEntity } from '../../../Domain/Entity/UserEntity'
import { UserAlreadyInRoomError } from '../../../Domain/errors/user-already-in-room.error'
import { WebRTCMock } from '../mocks/WebRTCMock'
import { RepositoryInMemoryMock } from '../mocks/RepositoryInMemoryMock'
import { UserUsecases } from '../../../Application/usecases/user.usecases'

const getSut = () => {
  const repository = new RepositoryInMemoryMock<RoomEntity>()
  const userUseCase = new UserUsecases(new WebRTCMock(), repository)
  const room = new RoomEntity(10, 'any_id')
  const user = new UserEntity('any_id')
  return { userUseCase, room, user, repository }
}

describe('Should test userJoinRoom usecase', () => {
  test('should put user inside room correctly', async () => {
    const { userUseCase, room, user, repository } = getSut()

    await userUseCase.joinRoom(room, user)

    expect(await repository.find(room.id).hasUser(user)).toBe(true)
  })

  test('should thrown if user is already in room', () => {
    const { userUseCase, room, user } = getSut()

    userUseCase.joinRoom(room, user)

    return expect(userUseCase.joinRoom(room, user)).rejects.toEqual(new UserAlreadyInRoomError())
  })

  test('should save room to update room in repo when user join at room', async () => {
    const { userUseCase, room, user, repository } = getSut()

    await userUseCase.joinRoom(room, user)

    const roomFromRepo = repository.find(room.id)

    expect(roomFromRepo).not.toBeUndefined()
  })
})
