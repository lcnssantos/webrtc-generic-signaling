import { WebRTCSFUContract } from '../../interfaces/webRTCSFUContract'
import { TransportationContract } from './interfaces/TransportationContract'

export class JanusSfu implements WebRTCSFUContract {
    private transport: TransportationContract
    constructor (transport: TransportationContract) {
      this.transport = transport
    }
}
