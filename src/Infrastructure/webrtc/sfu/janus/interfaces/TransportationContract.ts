import { GenericMessage } from '../transports/WebSocket/websocket-transport'

export interface TransportationContract {
    sendMessage(id: string, data: Object)
    deleteMessage (id: string),
    addMessageListener(id: string, callback: (msg: GenericMessage) => void)
}
