import { CreateRoomUseCase } from '../../../Application/usecases/create-room.usecase'
import { RepositoryInMemoryMock } from '../mocks/RepositoryInMemoryMock'
import { RoomEntity } from '../../../Domain/Entity/RoomEntity'
import { WebRTCMock } from '../mocks/WebRTCMock'
import { RoomAlreadyExistError } from '../../../Domain/errors/room-already-exist.error'

const getSut = () => {
  const repository = new RepositoryInMemoryMock<RoomEntity>()
  const createRoomUseCase = new CreateRoomUseCase(new WebRTCMock(), repository)
  return { repository, createRoomUseCase }
}

describe('Should test createRoom useCase', () => {
  test('Should create room correctly', async () => {
    const { repository, createRoomUseCase } = getSut()
    await createRoomUseCase.createRoom('any_id', 10)
    const room = await repository.find('any_id')
    expect(room).not.toBeUndefined()
  })

  test('Should thrown when user id already exist', async () => {
    const { repository, createRoomUseCase } = getSut()
    await createRoomUseCase.createRoom('any_id', 10)

    return expect(createRoomUseCase.createRoom('any_id', 10)).rejects.toEqual(new RoomAlreadyExistError())
  })
})
