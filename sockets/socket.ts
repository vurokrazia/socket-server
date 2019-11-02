import { Socket } from 'socket.io';
import SocketIO from 'socket.io';
export const disconect = (cliente: Socket) => {
  cliente.on('disconnect', ()=>{console.log("Cliente desconected");
  })
};
export const mensaje = (cliente :Socket, io: SocketIO.Server)=>{
  cliente.on('mensaje',(payload: {de:string, cuerpo:string}, callback) =>{
    io.emit('nuevo-mensaje', payload);
  });
}