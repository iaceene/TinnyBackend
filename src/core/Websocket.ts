import { WebSocketServer } from 'ws';
import type Server from './Server.js';

export class TinnyWs {
    private wss: WebSocketServer;
    
    constructor(server: Server){
        this.wss = new WebSocketServer({ server: server.getHttpServer() })
        this.wss.on("error", (error: Error)=>{
            server.log(`WS: ${error.message}`, "error")
        })
        return this
    }
    getWss(){
        return this.wss
    }
}