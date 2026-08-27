import Server from '../core/Server.js';
import { RawData, WebSocket } from 'ws';

function main(){
    const server = new Server({})
    server.log(`WS: creating ws server`)
    const wss = server.createWsServer().getWsServer();
    server.log(`WS: start listing for connections ${"ws://"+server.getHost()+":"+server.getPort()}`)
    wss.on("connection", (ws: WebSocket)=>{
        server.log(`WS: a new connection in ws recieved`)
        ws.on('message', (data: RawData)=>{
            server.log(`WS: a new message has been revcieved`)
            console.log(`WS message : `, data)
            console.log(`WS message STRING : `, data.toString())
            ws.send('tinny backend websocket is running !')
        })
        ws.on("close", (code: number, reason: Buffer)=>{
            server.log(`WS connection closed code ${code}, reason ${reason.toString()}`)
        })
    })
    server.listen()
}

main();