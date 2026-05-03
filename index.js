import http from 'http';
import { Server } from 'socket.io';
import path from 'node:path'
import express from 'express'

async function main(){
    const app = express();
app.use(express.static(path.resolve('./public')));

    const server = http.createServer(app);
    const io= new Server();
    io.attach(server);

    io.on('connection',(socket)=>{
        console.log('a user connected',socket.id)
        socket.on('user:message',(data)=>{
            console.log('message from client',data)
            socket.broadcast.emit('server:message',data)
        })

        socket.on('user:typing',()=>{
            socket.broadcast.emit('server:typing')
        })
    })

    server.listen(3000,()=>{
        console.log('server is running on the port 3000')
    })
}
main();