import { RoomEntity } from '../../../Domain/Entity/RoomEntity'
import { UserEntity } from '../../../Domain/Entity/UserEntity'
import { RepositoryInMemoryMock } from '../mocks/RepositoryInMemoryMock'
import { GetRoomUsersUseCase } from '../../../Application/usecases/get-room-users.usecase'
import { UserJoinRoomUseCase } from '../../../Application/usecases/user-join-room.usecase'
import { WebRTCMock } from '../mocks/WebRTCMock'
import { CreateRoomUseCase } from '../../../Application/usecases/create-room.usecase'

const getSut = () => {
  const repository = new RepositoryInMemoryMock<RoomEntity>()
  const room = new RoomEntity(10, 'any_id')
  const user = new UserEntity('any_id')
  const getRoomUsersUseCase = new GetRoomUsersUseCase(repository)
  const userJoinRoomUseCase = new UserJoinRoomUseCase(new WebRTCMock(), repository)
  const createRoomUseCase = new CreateRoomUseCase(new WebRTCMock(), repository)
  return { room, user, repository, userJoinRoomUseCase, getRoomUsersUseCase, createRoomUseCase }
}

describe('Should test getRoomUsers usecase', () => {
  test('Should get users inside room correctly', async () => {
    const { getRoomUsersUseCase, userJoinRoomUseCase, createRoomUseCase, repository, user } = getSut()
    await createRoomUseCase.createRoom('any_id', 10)

    const room = await repository.find('any_id')

    await userJoinRoomUseCase.join(room, user)

    const users = await getRoomUsersUseCase.get(room)

    expect(users).toBeInstanceOf(Array)
    expect(users).toHaveLength(1)
    expect(users.pop()).toBeInstanceOf(UserEntity)
  })
})
