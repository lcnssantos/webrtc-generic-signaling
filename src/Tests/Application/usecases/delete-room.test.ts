import { DeleteRoomUseCase } from '../../../Application/usecases/delete-room.usecase'
import { RepositoryInMemoryMock } from '../mocks/RepositoryInMemoryMock'
import { RoomEntity } from '../../../Domain/Entity/RoomEntity'
import { WebRTCMock } from '../mocks/WebRTCMock'
import { RoomAlreadyExistError } from '../../../Domain/errors/room-already-exist.error'
import { CreateRoomUseCase } from '../../../Application/usecases/create-room.usecase'
import { RoomNotFoundError } from '../../../Domain/errors/room-not-found.error'

const getSut = () => {
  const repository = new RepositoryInMemoryMock<RoomEntity>()
  const deleteRoomUseCase = new DeleteRoomUseCase(new WebRTCMock(), repository)
  const createRoomUseCase = new CreateRoomUseCase(new WebRTCMock(), repository)
  return { repository, deleteRoomUseCase, createRoomUseCase }
}

describe('Should test createRoom useCase', () => {
  test('Should delete room correctly', async () => {
    const { repository, deleteRoomUseCase, createRoomUseCase } = getSut()
    await createRoomUseCase.createRoom('any_id', 10)
    const room = await repository.find('any_id')
    await deleteRoomUseCase.delete(room)
    expect(await repository.find('any_id')).toBeUndefined()
  })

  test('Should thrown when room is not founded', async () => {
    const { deleteRoomUseCase } = getSut()

    const room = new RoomEntity(10, 'any_id')

    return expect(deleteRoomUseCase.delete(room)).rejects.toEqual(new RoomNotFoundError())
  })
})
