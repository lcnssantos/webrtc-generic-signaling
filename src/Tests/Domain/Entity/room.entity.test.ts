import { RoomEntity } from '../../../Domain/Entity/RoomEntity'
import { UserEntity } from '../../../Domain/Entity/UserEntity'
import { FullRoomError } from '../../../Domain/errors/full-room.error'

const getSut = () => {
  const room = new RoomEntity(1, 'any_id')
  const user = new UserEntity('any_id')

  return { room, user }
}

describe('Should test Room Entity', () => {
  test('Should add user to the room', () => {
    const { room, user } = getSut()
    room.addUser(user)
    expect(room.hasUser(user)).toBe(true)
  })

  test('Should remove user from the room', () => {
    const { room, user } = getSut()
    room.addUser(user)
    room.removeUser(user)
    expect(room.hasUser(user)).toBe(false)
  })

  test('Should return empty array of users if room is empty', () => {
    const { room } = getSut()
    expect(room.getUsers()).toHaveLength(0)
  })

  test('Should return error when users inside room is above maximum', () => {
    const { room } = getSut()
    const user1 = new UserEntity('any_id_1')
    const user2 = new UserEntity('any_id_2')

    room.addUser(user1)

    expect(() => room.addUser(user2)).toThrow()
  })
})
