import { WebRTC } from './Infrastructure/webrtc/webrtc'
import { JanusSfu } from './Infrastructure/webrtc/sfu/janus/janus.sfu'
import { WebsocketTransport } from './Infrastructure/webrtc/sfu/janus/transports/WebSocket/websocket-transport'
import { WebsocketConnection } from './Infrastructure/webrtc/sfu/janus/transports/WebSocket/websocket-connection'
import { RoomEntity } from './Domain/Entity/RoomEntity'
import { UserEntity } from './Domain/Entity/UserEntity'
import { RepositoryInMemory } from './Infrastructure/repository/RepositoryInMemory'

const webSocketConnection = new WebsocketConnection({
  protocol: 'janus-protocol',
  host: 'localhost',
  port: 8188
}, 15000)

const webSocketTransport = new WebsocketTransport(webSocketConnection)
const janus = new JanusSfu(webSocketTransport)
const webRtc = new WebRTC(janus)

const room = new RoomEntity(10, 'any_id')
const user = new UserEntity('any_id_user')

/* const joinRoomUseCase = new UserJoinRoomUseCase(webRtc, new RepositoryInMemory<RoomEntity>())

joinRoomUseCase.join(room, user) */
