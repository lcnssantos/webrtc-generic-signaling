import { WebRTCSFUContract } from '../../interfaces/webRTCSFUContract'
import { TransportationContract } from './interfaces/TransportationContract'
import { uuid } from '../../../libs/uuid'
import { GenericMessage } from './transports/WebSocket/websocket-transport'

export class JanusSfu implements WebRTCSFUContract {
    private transport: TransportationContract
    constructor (transport: TransportationContract) {
      this.transport = transport
    }

    async createRoom (id: string) {
      const transaction = uuid.create()
      console.log({ id, transaction })

      this.transport.addMessageListener(transaction, (msg: GenericMessage) => {
        console.log('message chegou!')
      })

      this.transport.sendMessage(transaction, {
        janus: 'create',
        transaction: transaction
      })
      /* return new Promise((resolve, reject) => {
        this.transport.addMessageListener(transaction, (msg: GenericMessage) => {
          console.log('message chegou!')
        })

        this.transport.sendMessage(transaction, {
          janus: 'create',
          transaction: transaction
        })
      }) */
    }
}
