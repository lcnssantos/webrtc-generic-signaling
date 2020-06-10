import { TransportationContract } from '../../interfaces/TransportationContract'
import { WebsocketInterface } from './interfaces/websocket-interface'

interface GenericMessage {
    id: string,
    [key: string]: any
}

export class WebsocketTransport implements TransportationContract {
    private receiveBuffer: Array<GenericMessage>
    private sendBuffer: Array<GenericMessage>
    private webSocket: WebsocketInterface

    constructor (websocket: WebsocketInterface) {
      this.webSocket = websocket

      this.receiveBuffer = []
      this.sendBuffer = []

      this.startSendBuffer()
    }

    getLastMessage (): Object {
      return undefined
    }

    getMessageById (id: string): GenericMessage {
      return this.receiveBuffer.find(data => data.id === id)
    }

    sendMessage (data: GenericMessage) {
      return this.addMessageToSendBuffer(data)
    }

    private addMessageToSendBuffer (data: GenericMessage) {
      this.sendBuffer.push(data)
      this.startSendBuffer()
    }

    private startSendBuffer () {
      while (this.sendBuffer.length) {
        const message = this.sendBuffer.shift()
        this.webSocket.sendMessage(message)
      }
    }
}
