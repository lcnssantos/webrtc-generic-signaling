import { RoomEntity } from '../../../Domain/Entity/RoomEntity'
import { UserEntity } from '../../../Domain/Entity/UserEntity'
import { WebRTCMock } from '../mocks/WebRTCMock'
import { RepositoryInMemoryMock } from '../mocks/RepositoryInMemoryMock'
import { RoomsUsecase } from '../../../Application/usecases/rooms.usecase'

const getSut = () => {
  const repository = new RepositoryInMemoryMock<RoomEntity>()
  const room = new RoomEntity(10, 'any_id')
  const user = new UserEntity('any_id')
  const roomUseCase = new RoomsUsecase(new WebRTCMock(), repository)
  return { repository, roomUseCase, user, room }
}

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
