import { UserEntity } from '../../../Domain/Entity/UserEntity'

describe('Should test userEntity fromRaw method', () => {
  test('Should construct userEntity correctly', () => {
    const data = {
      id: 'any_id'
    }

    const user = UserEntity.fromRaw(data)

    expect(user.id).toBe(data.id)
  })
})
