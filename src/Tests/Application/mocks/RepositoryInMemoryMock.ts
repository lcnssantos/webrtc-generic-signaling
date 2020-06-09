import { RepositoryContract } from 'Application/interfaces/RepositoryInterface'

export class RepositoryInMemoryMock<T> implements RepositoryContract<T> {
    private data: Array<T>

    constructor () {
      this.data = []
    }

    createOrUpdate (id: any, data: T) {

    }

    update (id: any, data: T) {

    }

    delete (id: any) {

    }

    add (data: T) {
      this.data.push(data)
    }

    deleteAll () {
      this.data = []
    }

    findAll (): Array<T> {
      return this.data
    }
}
