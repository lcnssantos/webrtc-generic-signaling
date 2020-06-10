export interface GenericRepositoryContract<T> {
    findAll(): Array<T>
    add(data: T)
    deleteAll()
    update(id: any, data: T)
    delete(id: any)
    createOrUpdate(id: any, data: T)
    find(id: any)
}
