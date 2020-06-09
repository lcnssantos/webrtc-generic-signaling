import { RoomEntity } from '../../../Domain/Entity/RoomEntity'
import { UserEntity } from '../../../Domain/Entity/UserEntity'
import { UserAlreadyInRoomError } from '../../../Domain/errors/user-already-in-room.error'
import { UserJoinRoomUseCase } from '../../../Application/usecases/user-join-room.usecase'
import { WebRTCMock } from '../mocks/WebRTCMock'

const getSut = () => {
  const userJoinRoomUseCase = new UserJoinRoomUseCase(new WebRTCMock())
  const room = new RoomEntity(10, 'any_id')
  const user = new UserEntity('any_id')
  return { userJoinRoomUseCase, room, user }
}

describe('Should test userJoinRoom usecase', () => {
  test('should put user inside room correctly', async () => {
    const { userJoinRoomUseCase, room, user } = getSut()

    await userJoinRoomUseCase.join(room, user)

    expect(room.hasUser(user)).toBe(true)
  })

  test('should thrown if user is already in room', () => {
    const { userJoinRoomUseCase, room, user } = getSut()

    userJoinRoomUseCase.join(room, user)

    return expect(userJoinRoomUseCase.join(room, user)).rejects.toEqual(new UserAlreadyInRoomError())
  })
})
