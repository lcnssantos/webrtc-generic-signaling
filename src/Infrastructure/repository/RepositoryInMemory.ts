import { GenericRepositoryContract } from 'Application/interfaces/GenericRepositoryContract'

interface GenericType {
  id: any
}

export class RepositoryInMemory<T extends GenericType> implements GenericRepositoryContract<T> {
    private data: Array<T>

    constructor () {
      this.data = []
    }

    createOrUpdate (id: any, data: T) {
      if (this.find(id)) {
        this.data = this.data.map(obj => {
          if (obj.id === id) {
            return data
          } else {
            return obj
          }
        })
      } else {
        this.add(data)
      }
    }

    find (id: any) {
      return this.data.find(obj => obj.id === id)
    }

    update (id: any, data: T) {
      this.data = this.data.map(obj => {
        if (obj.id === id) {
          return data
        } else {
          return obj
        }
      })
    }

    delete (id: any) {
      this.data = this.data.filter(obj => obj.id !== id)
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
