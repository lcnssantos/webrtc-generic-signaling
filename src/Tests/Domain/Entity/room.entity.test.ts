import { RoomEntity } from '../../../Domain/Entity/RoomEntity'
import { UserEntity } from '../../../Domain/Entity/UserEntity'
import { FullRoomError } from '../../../Domain/errors/full-room.error'
import { UserAlreadyInRoomError } from '../../../Domain/errors/user-already-in-room.error'

const getUserForSut = (id: string) => {
  return new UserEntity(id)
}
const getSut = (maxUsersOfRoom: number) => {
  const room = new RoomEntity(maxUsersOfRoom, 'any_id')
  const user = getUserForSut('any_id')

  return { room, user }
}

describe('Should test roomEntity hasUser method', () => {
  test("Shoudl return false if user isn't inside the room", () => {
    const { room, user } = getSut(1)
    expect(room.hasUser(user)).toBe(false)
  })

  test('Should return true if user is inside the room', () => {
    const { room, user } = getSut(1)
    room.addUser(user)
    expect(room.hasUser(user)).toBe(true)
  })
})

describe('Should test roomEntity addUser method', () => {
  test('Should add user to a room', () => {
    const { room, user } = getSut(1)
    room.addUser(user)
    expect(room.hasUser(user)).toBe(true)
  })

  test('Should throw if user is already at room', () => {
    const { room, user } = getSut(2)
    room.addUser(user)
    expect(() => room.addUser(user)).toThrow(UserAlreadyInRoomError)
  })

  test('Should throw if room is full', () => {
    const { room } = getSut(1)
    const user1 = getUserForSut('any_id1')
    const user2 = getUserForSut('any_id2')

    room.addUser(user1)

    expect(() => room.addUser(user2)).toThrow(FullRoomError)
  })
})

describe('Should test roomEntity removeUser', () => {
  test('Should remove user correctly', () => {
    const { room, user } = getSut(1)
    room.addUser(user)
    const length = room.getUsers().length
    room.removeUser(user)
    expect(room.getUsers()).toHaveLength(length - 1)
  })
})

describe('Should test roomEntity getUsers', () => {
  test('Should return instance of users according user inserted', () => {
    const { room, user } = getSut(1)
    room.addUser(user)
    const userReturned = room.getUsers()[0]
    expect(userReturned).toEqual(userReturned)
  })
})
