import { RoomEntity } from '../../../Domain/Entity/RoomEntity'
import { UserEntity } from '../../../Domain/Entity/UserEntity'
import { UserAlreadyInRoomError } from '../../../Domain/errors/user-already-in-room.error'
import { UserJoinRoomUseCase } from '../../../Application/usecases/user-join-room.usecase'
import { WebRTCMock } from '../mocks/WebRTCMock'
import { RepositoryInMemoryMock } from '../mocks/RepositoryInMemoryMock'

const getSut = () => {
  const repository = new RepositoryInMemoryMock<RoomEntity>()
  const userJoinRoomUseCase = new UserJoinRoomUseCase(new WebRTCMock(), repository)
  const room = new RoomEntity(10, 'any_id')
  const user = new UserEntity('any_id')
  return { userJoinRoomUseCase, room, user, repository }
}

describe('Should test userJoinRoom usecase', () => {
  test('should put user inside room correctly', async () => {
    const { userJoinRoomUseCase, room, user } = getSut()

    await userJoinRoomUseCase.join(room, user)

    expect(room.hasUser(user)).toBe(true)
  })

  test('should thrown if user is already in room', () => {
    const { userJoinRoomUseCase, room, user } = getSut()

    userJoinRoomUseCase.join(room, user)

    return expect(userJoinRoomUseCase.join(room, user)).rejects.toEqual(new UserAlreadyInRoomError())
  })

  test('should save room to update room in repo when user join at room', async () => {
    const { userJoinRoomUseCase, room, user, repository } = getSut()

    await userJoinRoomUseCase.join(room, user)

    const roomFromRepo = repository.find(room.id)

    expect(roomFromRepo).not.toBeUndefined()
  })
})
