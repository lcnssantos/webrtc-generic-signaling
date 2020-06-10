import { RepositoryInMemoryMock } from '../mocks/RepositoryInMemoryMock'
import { RoomEntity } from '../../../Domain/Entity/RoomEntity'
import { WebRTCMock } from '../mocks/WebRTCMock'
import { RoomAlreadyExistError } from '../../../Domain/errors/room-already-exist.error'
import { RoomsUsecase } from '../../../Application/usecases/rooms.usecase'
import { RoomNotFoundError } from '../../../Domain/errors/room-not-found.error'
import { UserEntity } from '../../../Domain/Entity/UserEntity'
import { UserUsecases } from '../../../Application/usecases/user.usecases'

const getSut = () => {
  const repository = new RepositoryInMemoryMock<RoomEntity>()
  const roomUseCase = new RoomsUsecase(new WebRTCMock(), repository)
  const userUseCase = new UserUsecases(new WebRTCMock(), repository)
  const room = new RoomEntity(10, 'any_id')
  const user = new UserEntity('any_id')
  return { repository, roomUseCase, user, userUseCase, room }
}

describe('Should test createRoom useCase', () => {
  test('Should create room correctly', async () => {
    const { repository, roomUseCase } = getSut()
    await roomUseCase.create('any_id', 10)
    const room = await repository.find('any_id')
    expect(room).not.toBeUndefined()
  })

  test('Should thrown when room already exist', async () => {
    const { repository, roomUseCase } = getSut()
    await roomUseCase.create('any_id', 10)

    return expect(roomUseCase.create('any_id', 10)).rejects.toEqual(new RoomAlreadyExistError())
  })
})

describe('Should test deleteRoom useCase', () => {
  test('Should delete room correctly', async () => {
    const { repository, roomUseCase } = getSut()
    await roomUseCase.create('any_id', 10)
    const room = await repository.find('any_id')
    await roomUseCase.delete(room)
    expect(await repository.find('any_id')).toBeUndefined()
  })

  test('Should thrown when room is not founded', async () => {
    const { roomUseCase } = getSut()

    const room = new RoomEntity(10, 'any_id')

    return expect(roomUseCase.delete(room)).rejects.toEqual(new RoomNotFoundError())
  })
})

describe('Should test getRoomUsers usecase', () => {
  test('Should get users inside room correctly', async () => {
    const { roomUseCase, repository, user, userUseCase } = getSut()
    await roomUseCase.create('any_id', 10)

    const room = await repository.find('any_id')

    await userUseCase.joinRoom(room, user)

    const users = await roomUseCase.getUsers(room)

    expect(users).toBeInstanceOf(Array)
    expect(users).toHaveLength(1)
    expect(users.pop()).toBeInstanceOf(UserEntity)
  })
})

describe('Should test userJoinRoom getRooms usecase', () => {
  test('Should get rooms correctly', async () => {
    const { roomUseCase } = getSut()
    await roomUseCase.create('any_id', 10)

    const rooms = await roomUseCase.get()

    expect(rooms).toBeInstanceOf(Array)
    expect(rooms).toHaveLength(1)
    expect(rooms.pop()).toBeInstanceOf(RoomEntity)
  })
})
