import { v4 } from 'uuid'

export class uuid {
  static create () {
    return v4()
  }
}
