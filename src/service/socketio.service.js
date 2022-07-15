//import { io } from "socket.io-client";
import store from "../store";

class SocketioService {
  socket;
  constructor() {}

  setupSocketConnection() {
    //this.socket = io("http://11.1.4.181:5000");

    this.socket.on("constructor", (sededata, tramitesdata) => {
      store.state.sede = sededata;
      store.state.tramites = tramitesdata;
      console.log(tramitesdata);
    });
    //SEDE
    this.socket.on("sede", (data) => {
      console.log(data);
      store.commit("setSede", data);
    });
    //TRAMITE
    this.socket.on("addtramite", (nombre, letra, id) => {
      console.log("paso por addtramit" + nombre + letra + id);
      let objetotramite = {
        nombre_tramite: nombre,
        identificador_tramite: letra,
        id_tramite: id,
      };
      store.state.tramites.push(objetotramite);
    });

    //EDITAR TRAMITE
    this.socket.on("editartramite", (data) => {
      console.log("ya regreso la data del server : " + data.nombre_tramite);
      store.commit("editartramite", data);
    });

    this.socket.on("eliminar", (data) => {
      store.commit("eliminar", data);
    });
  }

  //SEDE
  setSede(nombre) {
    this.socket.emit("setSede", nombre);
  }

  //TRAMITES
  addtramite(datos) {
    this.socket.emit("addtramite", datos);
  }

  //EDITAR TRAMITE
  editartramite(datos) {
    this.socket.emit("editartramite", datos);
  }

  eliminar(datos) {
    this.socket.emit("eliminar", datos);
  }
}

export default new SocketioService();
