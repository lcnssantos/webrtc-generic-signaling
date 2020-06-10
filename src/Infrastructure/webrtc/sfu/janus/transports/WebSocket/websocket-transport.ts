import { TransportationContract } from '../../interfaces/TransportationContract'
import { WebsocketInterface } from './interfaces/websocket-interface'
import { uuid } from '../../../../../libs/uuid'

export interface GenericMessage {
  [key: string]: any
}

export class WebsocketTransport implements TransportationContract {
    private receiveBuffer: Map<string, GenericMessage>
    private sendBuffer: Map<string, GenericMessage>
    private webSockets: Array<WebsocketInterface>
    private connectionSelected: number;
    private messageListeners: Map<string, (message: GenericMessage) => void>

    constructor (websockets: Array<WebsocketInterface>) {
      this.webSockets = websockets
      this.connectionSelected = 0
      this.receiveBuffer = new Map()
      this.sendBuffer = new Map()
      this.startSendBuffer()
      this.messageListeners = new Map()
      this.webSockets.forEach(websocket => websocket.setListener((message: string) => this.receiveMessage(message)))
    }

    addMessageListener (id: string, callback: (message: GenericMessage) => void) {
      this.messageListeners.set(id, callback)
    }

    deleteMessage (id: string) {
      this.receiveBuffer.delete(id)
    }

    sendMessage (id: string, data: GenericMessage) {
      this.sendBuffer.set(id, data)
      this.startSendBuffer()
    }

    private receiveMessage (message: string) {
      const msgData: GenericMessage = JSON.parse(message)
      const keys = this.messageListeners.forEach(callback => callback(msgData))
      this.receiveBuffer.set(uuid.create(), msgData)
    }

    private startSendBuffer () {
      while (this.sendBuffer.size) {
        const message = this.sendBuffer.get(this.sendBuffer.keys()[0])
        this.webSockets[this.connectionSelected].sendMessage(JSON.stringify(message))
        this.connectionSelected++
        if (this.connectionSelected >= this.webSockets.length) {
          this.connectionSelected = 0
        }
      }
    }
}
