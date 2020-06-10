export interface TransportationContract {
    sendMessage(data: Object)
    getLastMessage(): Object,
    getMessageById(id: string): Object
}
