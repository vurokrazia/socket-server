import { Socket } from 'socket.io';
import SocketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-listas';
import { Usuario } from '../classes/usuarios';

export const usuariosConectados = new UsuariosLista();

export const disconect = (cliente: Socket, io: SocketIO.Server) => {
  cliente.on('disconnect', ()=>{    
    usuariosConectados.borrarUsuario(cliente.id);
    io.emit('usuarios-activos',usuariosConectados.getLista());
  })
};
export const mensaje = (cliente :Socket, io: SocketIO.Server)=>{
  cliente.on('mensaje',(payload: {de:string, cuerpo:string}, callback) =>{
    io.emit('nuevo-mensaje', payload);
  });
}

export const configurarUsuario = (cliente :Socket, io: SocketIO.Server)=>{
  cliente.on('configurar-usuario',(payload: { nombre: string }, callback: Function) =>{
    usuariosConectados.actualizarNombre(cliente.id,payload.nombre);
    io.emit('usuarios-activos',usuariosConectados.getLista());
    callback({
      ok:true,
      mensaje: `Usuario ${payload.nombre}, listo`
    })
    //io.emit('configurar-usuario', payload);
  });
}

export const conectarCliente = (cliente :Socket, io: SocketIO.Server)=>{ 
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
};

export const obtenerUsuarios = (cliente :Socket, io: SocketIO.Server)=>{
  cliente.on('obtener-usuarios',() =>{
    console.log("obtener-usuarios",usuariosConectados.getLista());
    io.to(cliente.id).emit('usuarios-activos',usuariosConectados.getLista());
  });
}