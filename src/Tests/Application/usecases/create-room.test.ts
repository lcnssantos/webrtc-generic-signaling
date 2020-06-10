import { RepositoryInMemoryMock } from '../mocks/RepositoryInMemoryMock'
import { RoomEntity } from '../../../Domain/Entity/RoomEntity'
import { WebRTCMock } from '../mocks/WebRTCMock'
import { RoomAlreadyExistError } from '../../../Domain/errors/room-already-exist.error'
import { RoomsUsecase } from '../../../Application/usecases/rooms.usecase'

const getSut = () => {
  const repository = new RepositoryInMemoryMock<RoomEntity>()
  const roomUseCase = new RoomsUsecase(new WebRTCMock(), repository)
  return { repository, roomUseCase }
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
