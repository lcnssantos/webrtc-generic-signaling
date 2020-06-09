import { RoomEntity } from '../../../Domain/Entity/RoomEntity'
import { UserEntity } from '../../../Domain/Entity/UserEntity'
import { WebRTCMock } from '../mocks/WebRTCMock'
import { RepositoryInMemoryMock } from '../mocks/RepositoryInMemoryMock'
import { GetRoomsUsecase } from '../../../Application/usecases/get-rooms.usecase'
import { CreateRoomUseCase } from '../../../Application/usecases/create-room.usecase'

const getSut = () => {
  const repository = new RepositoryInMemoryMock<RoomEntity>()
  const room = new RoomEntity(10, 'any_id')
  const user = new UserEntity('any_id')
  const getRoomUseCase = new GetRoomsUsecase(repository)
  const createRoomUseCase = new CreateRoomUseCase(new WebRTCMock(), repository)
  return { room, user, repository, getRoomUseCase, createRoomUseCase }
}

describe('Should test userJoinRoom getRooms usecase', () => {
  test('Should get rooms correctly', async () => {
    const { createRoomUseCase, getRoomUseCase } = getSut()
    await createRoomUseCase.createRoom('any_id', 10)

    const rooms = await getRoomUseCase.get()

    expect(rooms).toBeInstanceOf(Array)
    expect(rooms).toHaveLength(1)
    expect(rooms.pop()).toBeInstanceOf(RoomEntity)
  })
})
