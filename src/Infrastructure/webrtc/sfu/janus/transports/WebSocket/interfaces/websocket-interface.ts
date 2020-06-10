export interface WebsocketInterface {
    getStatus()
    sendMessage(data: any)
    setListener(listener: (message: string) => void)
}
