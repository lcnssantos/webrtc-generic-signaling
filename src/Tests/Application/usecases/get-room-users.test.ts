import { RoomEntity } from '../../../Domain/Entity/RoomEntity'
import { UserEntity } from '../../../Domain/Entity/UserEntity'
import { RepositoryInMemoryMock } from '../mocks/RepositoryInMemoryMock'
import { WebRTCMock } from '../mocks/WebRTCMock'
import { RoomsUsecase } from '../../../Application/usecases/rooms.usecase'

const getSut = () => {
  const repository = new RepositoryInMemoryMock<RoomEntity>()
  const roomUseCase = new RoomsUsecase(new WebRTCMock(), repository)
  const user = new UserEntity('any_id')
  return { repository, roomUseCase, user }
}

describe('Should test getRoomUsers usecase', () => {
  test('Should get users inside room correctly', async () => {
    // todo
    /* const { roomUseCase, repository, user } = getSut()
    await roomUseCase.create('any_id', 10)

    const room = await repository.find('any_id')

    await userJoinRoomUseCase.join(room, user)

    const users = await getRoomUsersUseCase.get(room)

    expect(users).toBeInstanceOf(Array)
    expect(users).toHaveLength(1)
    expect(users.pop()).toBeInstanceOf(UserEntity) */
  })
})
