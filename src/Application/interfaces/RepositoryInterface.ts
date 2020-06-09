export interface RepositoryContract<T> {
    findAll(): Array<T>
    add(data: T)
    deleteAll()
    update(id: any, data: T)
    delete(id: any)
    createOrUpdate(id: any, data: T)
}
