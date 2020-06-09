export class UserEntity {
  public id: string
  constructor (id: string) {
    this.id = id
  }

  static fromRaw (data: {id: string}) {
    return new this(data.id)
  }
}
