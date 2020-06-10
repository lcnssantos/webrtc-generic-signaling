import { RepositoryInMemoryMock } from '../mocks/RepositoryInMemoryMock'
import { RoomEntity } from '../../../Domain/Entity/RoomEntity'
import { RoomsUsecase } from '../../../Application/usecases/rooms.usecase'
import { WebRTCMock } from '../mocks/WebRTCMock'
import { UserUsecases } from '../../../Application/usecases/user.usecases'
import { UserEntity } from '../../../Domain/Entity/UserEntity'
import { UserAlreadyInRoomError } from '../../../Domain/errors/user-already-in-room.error'
import { UserNotFoundError } from '../../../Domain/errors/user-not-found.error'

const getSut = () => {
  const repository = new RepositoryInMemoryMock<RoomEntity>()
  const roomUseCase = new RoomsUsecase(new WebRTCMock(), repository)
  const userUseCase = new UserUsecases(new WebRTCMock(), repository)
  const room = new RoomEntity(10, 'any_id')
  const user = new UserEntity('any_id')
  return { repository, roomUseCase, user, userUseCase, room }
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
