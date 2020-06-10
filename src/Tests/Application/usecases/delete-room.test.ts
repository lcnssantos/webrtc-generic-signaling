import { RepositoryInMemoryMock } from '../mocks/RepositoryInMemoryMock'
import { RoomEntity } from '../../../Domain/Entity/RoomEntity'
import { WebRTCMock } from '../mocks/WebRTCMock'
import { RoomNotFoundError } from '../../../Domain/errors/room-not-found.error'
import { RoomsUsecase } from '../../../Application/usecases/rooms.usecase'

const getSut = () => {
  const repository = new RepositoryInMemoryMock<RoomEntity>()
  const roomUseCase = new RoomsUsecase(new WebRTCMock(), repository)
  return { repository, roomUseCase }
}

describe('Should test createRoom useCase', () => {
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
