import * as WebSocket from 'ws'
import { WebsocketInterface } from './interfaces/websocket-interface'

export class WebsocketConnection implements WebsocketInterface {
    private connection: WebSocket
    private connectionStatus: boolean
    private host: string
    private port: number
    private protocol: string
    private listener: (message: string) => void

    constructor (data: {host: string, port: number, protocol: string}, private timeout: number) {
      this.host = data.host
      this.port = data.port
      this.protocol = data.protocol
      this.connectionStatus = false
      this.openConnection()
    }

    private openConnection () {
      this.connection = new WebSocket(`ws://${this.host}:${this.port}`, this.protocol)
      this.registerEvents()
    }

    private registerEvents () {
      this.connection.on('open', () => {
        this.connectionStatus = true
      })

      this.connection.on('close', () => {
        this.connectionStatus = false
      })

      this.connection.on('error', (event) => {
        this.connectionStatus = false

        setTimeout(() => {
          this.openConnection()
        }, this.timeout)
      })

      this.connection.on('message', (message) => {
        this.listener(message.toString())
      })
    }

    public getStatus () {
      return this.connectionStatus
    }

    sendMessage (data: any) {
      console.log(data)
      this.connection.send(data)
    }

    setListener (listener: (message: string) => void) {
      this.listener = listener
    }
}
