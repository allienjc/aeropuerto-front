import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: false,
    footer: true,
    dialoge: false,
    sede: "",
    dialogtramite: false,
    dialognoticia: false,
    dialogatencion: false,
    tramites: [],
    tramite_editar: "",
    idtramite_editar: null,
    letratramite_editar: "",
    opcion_editartramites: false,
    opcion_editarnoticias: false,
    proceso: "",
    id_eliminar: null,
    noticias: [],
    idnoticiaeditar: null,
    noticiaeditar: "",
    modulos: [],
    idmoduloeditar: null,
    moduloeditar: "",
    passworeditar: "",
    opcion_editarmodulo: false,
    media: [],
    archivoeliminar: "",
    turnos: [],
    turnoeliminar: "",
    snack: false,
    snack2: false,
    turnollamar: "",
    segundero: false,
    dialogconfirm: false,
    dialogturno: false,
    dialogdeleteall: false,
    mensajelogin: false,
    modulo: "",
    id_modulo: "",
    objetologin: [],
    dialogconfirmar: false,
    tramiteconfirmar: "",
    dialogenviar: false,
    moduloenviar: "",
    isadmin: false,
    issuperadmin: false,
    interval: null,
    turnosallamar: [],
    logged: false,
    dialogprincipal: false,
    estatuscola: false,
    paginax: 0,
    recuadroprincipal: [],
    nombrellamar: "",
  },
  mutations: {
    paginamas(state) {
      state.paginax++;
    },

    paginamenos(state) {
      state.paginax = 0;
    },

    //ABRIR DIALOG PRINCIPAL DE LLAMDO DE TURNOS
    abrirprincipal(state) {
      state.dialogprincipal = true;
    },

    cerrarprincipal(state) {
      state.dialogprincipal = false;
    },
    //ABRIRDIALOG ENVIAR
    abrirenviar(state, tramite) {
      if (tramite) {
        state.tramiteconfirmar = tramite;
      }
      state.dialogenviar = !state.dialogenviar;
    },

    //CONFIRMDIALOG
    abrirconfirm(state, tramite) {
      if (tramite) {
        state.tramiteconfirmar = tramite;
      }
      state.dialogconfirmar = !state.dialogconfirmar;
    },

    //CONSTRUCTOR
    SOCKET_constructor(state, datos) {
      state.sede = datos.sede;
      state.tramites = datos.tramites;
      state.noticias = datos.noticias;
      state.modulos = datos.modulos;
      state.media = datos.media;
      state.turnos = datos.turnos;
      state.turnosallamar = datos.cola;
      state.recuadroprincipal = datos.recuadro;
    },

    //AÑADIR ADMINITRADOR AL SELECT DE LOGIN

    //ERROR LOADING
    SOCKET_loginerror(state) {
      state.mensajelogin = true;
      setTimeout(() => {
        state.mensajelogin = false;
      }, 3000);
    },

    SOCKET_loginok(state, datos) {
      state.modulo = datos.nombre_modulo;
      if (datos.nombre_modulo == "ADMINISTRADOR") {
        sessionStorage.setItem(
          "usuario",
          JSON.stringify({ usuario: datos.nombre_modulo, tipo: "admin" })
        );
        state.logged = true;
      }
      if (datos.nombre_modulo == "SUPER ADMINISTRADOR") {
        sessionStorage.setItem(
          "usuario",
          JSON.stringify({ usuario: datos.nombre_modulo, tipo: "supersayayin" })
        );
        state.logged = true;
      }
      if (
        datos.nombre_modulo != "SUPER ADMINISTRADOR" &&
        datos.nombre_modulo != "ADMINISTRADOR"
      )
        sessionStorage.setItem(
          "usuario",
          JSON.stringify({
            usuario: datos.nombre_modulo,
            tipo: "normal",
            id_modulo: datos.id_modulo,
          })
        );
      state.logged = true;
    },

    //ACTIVAR MODULO - USER CONNECT
    SOCKET_userconected(state, datos) {
      let index = state.modulos.findIndex(
        (val) => val.id_modulo == datos.id_modulo
      );
      state.modulos.splice(index, 1, {
        ...state.modulos[index],
        estatus_modulo: "ABIERTO",
      });
      console.log(state.modulos);
    },

    //USER LEFT
    SOCKET_userleft(state, datos) {
      let index = state.modulos.findIndex(
        (val) => val.id_modulo == datos.id_modulo
      );
      state.modulos.splice(index, 1, {
        ...state.modulos[index],
        estatus_modulo: "CERRADO",
      });
    },

    //DIALOG CONFIRM
    abrirdialogconfirm(state) {
      state.dialogconfirm = !state.dialogconfirm;
    },

    //SNACKTRUE
    snacktrue(state) {
      state.snack = true;
    },

    //SNACK2
    snacktrue2(state) {
      console.log("recall desde vuex");
      state.snack2 = true;
      setTimeout(() => {
        state.snack2 = false;
      }, 3000);
    },

    //BORRARTURNOS
    SOCKET_borrartodo(state) {
      state.turnos = [];
      state.recuadroprincipal.splice(0, state.recuadroprincipal.length);
    },

    //ELIMINAR ARCHIVO
    SOCKET_deletearchivo(state, datos) {
      let index = state.media.findIndex((v) => v == datos);
      console.log(index);
      state.media.splice(index, 1);
    },

    SOCKET_addarchivo(state, datos) {
      state.media.push(datos);
    },

    //AÑADIR TURNO
    SOCKET_addturno(state, datos) {
      console.log("socket turno   :" + datos.nombre);
      state.turnos.push(datos);
    },

    //LLAMANDO TURNO
    SOCKET_llamando(state, datos) {
      console.log(datos.nombre);
      let index = state.turnos.findIndex((val) => val.turno == datos.turno);
      console.log("index despues de borrar: " + index);
      state.turnos.splice(index, 1, {
        ...state.turnos[index],
        estatus_turno: "ATENDIENDO",
        id_modulo: datos.nombre_modulo,
      });
      state.turnosallamar.unshift(datos);
      state.logged = true;
      state.dialogprincipal = true;

      console.log("COLA PARA LLAMAR: " + state.turnosallamar[0].nombre_modulo);
    },

    //ATENDIDO
    SOCKET_atendido(state, datos) {
      console.log(datos);
      let index = state.turnos.findIndex((val) => val.turno == datos);
      state.turnos.splice(index, 1, {
        ...state.turnos[index],
        estatus_turno: "TERMINADO",
      });
    },

    //DIALOG TURNOS
    abrirturnos(state) {
      state.dialogturno = !state.dialogturno;
    },

    //DIALOGDELETEALL
    abrirdeleteall(state) {
      state.dialogdeleteall = !state.dialogdeleteall;
    },

    //delete recuadro
    deleterecuadro(state) {
      state.recuadroprincipal.splice(0, state.recuadroprincipal.length);
      console.log(state.recuadroprincipal);
    },

    //SEDE
    SOCKET_setSede(state, nombre) {
      state.sede = nombre;
    },

    cambiar(state) {
      state.drawer = true;
      state.footer = false;
    },

    dialogel(state, datos) {
      if (datos) {
        if (datos.proceso == "media") {
          state.archivoeliminar = datos.archivo;
          state.id_eliminar = null;
          state.proceso = datos.proceso;
        } else {
          state.id_eliminar = datos.id;
          state.proceso = datos.proceso;
        }
      }
      state.dialoge = !state.dialoge;
    },

    abrirsegundero(state, datos) {
      console.log("datos: " + datos.nombre);
      state.turnollamar = datos.turno;
      state.nombrellamar = datos.nombre;
      if (datos.nombre_modulo) {
        state.moduloenviar = datos.nombre_modulo;
      }
      state.segundero = !state.segundero;
    },

    //**TRAMITES */
    abrirtramites(state, datos) {
      if (datos) {
        console.log("si hay datos");
        state.tramite_editar = datos.tramite;
        state.idtramite_editar = datos.id;
        state.letratramite_editar = datos.letra;
        state.opcion_editartramites = true;
        state.dialogtramite = !state.dialogtramite;
      } else {
        state.opcion_editartramites = false;
        state.dialogtramite = !state.dialogtramite;
      }
    },

    SOCKET_addtramite(state, datos) {
      let objetotramite = {
        nombre_tramite: datos.nombre,
        identificador_tramite: datos.letra,
        id_tramite: datos.id,
      };
      state.tramites.push(objetotramite);
    },

    SOCKET_editartramite(state, datos) {
      console.log(datos);
      let index = state.tramites.findIndex(
        (v) => v.id_tramite === datos.id_tramite
      );
      state.tramites[index].nombre_tramite = datos.nombre_tramite;
      state.tramites[index].identificador_tramite = datos.identificador_tramite;
      state.opcion_editartramites = false;
      state.tramite_editar = "";
      state.letratramite_editar = "";
      state.idtramite_editar = null;
      console.log("saliendo de editar tramite :" + index);
    },

    SOCKET_eliminar(state, datos) {
      console.log("eliminando: " + datos.proceso);
      if (datos.proceso == "tramite") {
        let index = state.tramites.findIndex((v) => v.id_tramite === datos.id);
        state.tramites.splice(index, 1);
      }
      if (datos.proceso == "noticia") {
        let index = state.noticias.findIndex((v) => v.id_noticia === datos.id);
        state.noticias.splice(index, 1);
      }
      if (datos.proceso == "atencion") {
        let index = state.modulos.findIndex((v) => v.id_modulo === datos.id);
        state.modulos.splice(index, 1);
        let index2 = state.modulos.findIndex(
          (v) => v.nombre_modulo === datos.nombre_modulo
        );
        state.objetologin.splice(index2, 1);
      }
      if (datos.proceso == "turno") {
        console.log("eliminando turno: " + datos.turno);
        let index = state.turnos.findIndex((v) => v.turno === datos.turno);
        state.turnos.splice(index, 1);
        let indexb = state.recuadroprincipal.findIndex(
          (el) => el.turno == datos.turno
        );
        state.recuadroprincipal.splice(indexb, 1);
      }
    },

    //NOTICIAS
    SOCKET_addnoticia(state, datos) {
      console.log("llego de regreso la data: " + datos.noticia);
      let objetonoticia = {
        id_noticia: datos.id_noticia,
        noticia: datos.noticia,
        fecha: datos.fecha,
      };
      state.noticias.push(objetonoticia);
    },

    abrirnoticias(state, datos) {
      if (datos) {
        console.log("si hay datos");
        state.opcion_editarnoticias = true;
        state.noticiaeditar = datos.noticia;
        state.idnoticiaeditar = datos.id_noticia;
        state.dialognoticia = !state.dialognoticia;
      } else {
        console.log("no hay datos");
        state.noticiaeditar = "";
        state.idnoticiaeditar = "";
        state.opcion_editarnoticias = false;
        state.dialognoticia = !state.dialognoticia;
      }
    },

    SOCKET_editarnoticia(state, datos) {
      console.log(datos);
      let index = state.noticias.findIndex(
        (v) => v.id_noticia === datos.id_noticia
      );
      state.noticias[index].noticia = datos.noticia;
      state.idnoticiaeditar = null;
      state.noticiaeditar = "";
      state.opcion_editar = false;

      console.log("estamos en el vuex :" + index);
    },

    //ATENCION
    abriratencion(state, datos) {
      if (datos) {
        console.log("editar atencion : " + datos.password_modulo);
        state.idmoduloeditar = datos.id_modulo;
        state.moduloeditar = datos.nombre_modulo;
        state.passworeditar = datos.password_modulo;
        state.opcion_editarmodulo = true;
        state.dialogatencion = !state.dialogatencion;
      } else {
        console.log("no hay datos");
        state.moduloeditar = "";
        state.idmoduloeditar = null;
        state.passworeditar = "";
        state.opcion_editarmodulo = false;
        state.dialogatencion = !state.dialogatencion;
      }
    },

    SOCKET_addatencion(state, datos) {
      let objetomodulo = {
        id_modulo: datos.id_modulo,
        nombre_modulo: datos.nombre_modulo,
        password_modulo: datos.password_modulo,
        estatus_modulo: datos.estatus_modulo,
      };
      state.modulos.push(objetomodulo);
      state.objetologin.push(objetomodulo);
    },

    SOCKET_editaratencion(state, datos) {
      let index = state.modulos.findIndex(
        (v) => v.id_modulo === datos.id_modulo
      );
      state.modulos[index].nombre_modulo = datos.nombre;
      state.modulos[index].password_modulo = datos.pass;
      state.idmoduloeditar = null;
      state.moduloeditar = "";
      state.passworeditar = "";
      state.opcion_editarmodulo = false;
      state.dialogatencion = !state.dialogatencion;
    },
  },

  actions: {
    cambiar(state) {
      state.commit("cambiar");
    },
  },
  modules: {},
});
