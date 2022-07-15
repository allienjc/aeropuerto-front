<template>
  <v-container class="" fluid>
    <v-row justify="center" class="yellow lighten-1 rounded-lg" dense>
      <v-col cols="12" class="text-center">
        <h2>
          CONFIGURACION GENERAL<v-icon large color="black" class="ml-5"
            >fas fa-cogs</v-icon
          >
        </h2>
      </v-col>
    </v-row>
    <v-row class="mt-5">
      <v-col cols="12" md="5" class="">
        <v-row class=""
          ><v-col cols="12" class="">
            <v-card rounded="lg" elevation="24" class="bordercard">
              <v-row>
                <v-col>
                  <v-card-title class="teal--text text--darken-4"
                    >NOMBRE DE LA SEDE
                    <v-spacer></v-spacer>
                    <v-icon color="teal darken-4" large>fas fa-building</v-icon>
                  </v-card-title>
                  <v-card-text class="">
                    <v-text-field
                      v-model="sede2"
                      :disabled="sededisabled"
                      dense
                      color="teal"
                      label="NOMBRE DE LA SEDE"
                      class="upper"
                    >
                    </v-text-field>

                    <v-row justify="center" class="mt-1 pb-2"
                      ><v-btn
                        v-if="!sededisabled"
                        @click="setSede()"
                        :loading="sedeloading"
                        small
                        dark
                        color="teal darken-4"
                        >GUARDAR</v-btn
                      >
                      <v-btn
                        v-if="sededisabled"
                        @click="sededisabled = !sededisabled"
                        :loading="sedeloading"
                        small
                        dark
                        color="teal darken-4"
                        >EDITAR</v-btn
                      >
                    </v-row>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
        <v-row class="">
          <v-col cols="12">
            <v-card elevation="24" rounded="lg" class="bordercard">
              <v-card-title class="teal--text text--darken-4"
                >MULTIMEDIA
                <v-spacer></v-spacer>
                <v-icon color="teal darken-4" large> fas fa-video </v-icon>
              </v-card-title>
              <v-card-text>
                <v-simple-table fixed-header height="200px" style="" class="">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-center teal darken-4 white--text">
                          NUMERO
                        </th>
                        <th class="text-center teal darken-4 white--text">
                          TITULO
                        </th>
                        <th class="text-center teal darken-4 white--text">
                          TIPO
                        </th>
                        <th class="text-center teal darken-4 white--text">
                          ACCIONES
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(archivo, index) in media"
                        :key="index"
                        class="text-center"
                      >
                        <td>{{ index + 1 }}</td>
                        <td>{{ archivo.toUpperCase() }}</td>
                        <td>{{ archivo | extension }}</td>
                        <td class="text-center">
                          <menum :archivo="archivo" :proceso="'media'" />
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
                <v-row>
                  <v-col cols="12" class="d-flex justify-center">
                    <multimedia />
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row class="">
          <v-col cols="12">
            <v-card rounded="lg" elevation="15" class="bordercard">
              <v-card-title class="teal--text text--darken-4">
                NOTICIAS
                <v-spacer></v-spacer>
                <v-icon large color="teal darken-4">fas fa-newspaper</v-icon>
              </v-card-title>
              <v-card-text>
                <v-simple-table fixed-header height="200px">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-center teal darken-4 white--text">
                          NUMERO
                        </th>
                        <th class="text-center teal darken-4 white--text">
                          NOTICIA
                        </th>
                        <th class="text-center teal darken-4 white--text">
                          FECHA
                        </th>
                        <th class="text-center teal darken-4 white--text">
                          ACCIONES
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(noticia, index) in noticias"
                        :key="index"
                        class="text-center"
                      >
                        <td>{{ index + 1 }}</td>
                        <td>
                          <span
                            class="d-inline-block text-truncate text-uppercase"
                            style="max-width: 200px"
                            >{{ noticia.noticia }}</span
                          >
                        </td>
                        <td>{{ noticia.fecha | divisionfecha }}</td>
                        <td class="text-center">
                          <Menua
                            :id="noticia.id_noticia"
                            :noticia="noticia.noticia"
                            proceso="noticia"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
                <v-row>
                  <v-col cols="12" class="d-flex justify-center">
                    <v-btn
                      dark
                      small
                      color="teal darken-4"
                      @click="abrirnoticias"
                    >
                      AGREGAR
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="7" class="">
        <v-row
          ><v-col>
            <v-card rounded="lg" elevation="24" class="bordercard">
              <v-row>
                <v-col cols="12" class="">
                  <v-card-title class="teal--text text--darken-4"
                    >MÓDULOS DE ATENCIÓN
                    <v-spacer></v-spacer>
                    <v-icon large color="teal darken-4" class=""
                      >fas fa-bell</v-icon
                    >
                  </v-card-title>
                  <v-card-text class="">
                    <v-simple-table fixed-header height="200px">
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-center teal darken-4 white--text">
                              NOMBRE
                            </th>
                            <th class="text-center teal darken-4 white--text">
                              CONTRASEÑA
                            </th>
                            <th class="text-center teal darken-4 white--text">
                              ESTATUS
                            </th>
                            <th class="text-center teal darken-4 white--text">
                              ACCIONES
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(modulo, index) in modulos"
                            :key="index"
                            class="text-center"
                          >
                            <td>{{ modulo.nombre_modulo }}</td>
                            <td>{{ modulo.password_modulo }}</td>
                            <td>{{ modulo.estatus_modulo }}</td>

                            <td class="text-center">
                              <Menua
                                :id="modulo.id_modulo"
                                :nombre_modulo="modulo.nombre_modulo"
                                :password="modulo.password_modulo"
                                proceso="atencion"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                    <v-row>
                      <v-col cols="12" class="d-flex justify-center">
                        <v-btn
                          @click="abriratencion"
                          dark
                          small
                          color="teal darken-4"
                        >
                          AGREGAR
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-card elevation="24" rounded="lg" class="bordercard">
              <v-card-title class="teal--text text--darken-4"
                >TRAMITES
                <v-spacer></v-spacer>
                <v-icon color="teal darken-4" large>fas fa-briefcase</v-icon>
              </v-card-title>

              <v-card-text>
                <v-simple-table fixed-header height="200px" style="" class="">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-center teal darken-4 white--text">
                          NUMERO
                        </th>
                        <th class="text-center teal darken-4 white--text">
                          NOMBRE
                        </th>
                        <th class="text-center teal darken-4 white--text">
                          IDENTIFICADOR
                        </th>

                        <th class="text-center teal darken-4 white--text">
                          ACCIONES
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(tramite, index) in tramites"
                        :key="index"
                        class="text-center"
                      >
                        <td>{{ index + 1 }}</td>
                        <td>{{ tramite.nombre_tramite }}</td>
                        <td>{{ tramite.identificador_tramite }}</td>
                        <td class="text-center">
                          <menua
                            :id="tramite.id_tramite"
                            :tramite="tramite.nombre_tramite"
                            :letra="tramite.identificador_tramite"
                            proceso="tramite"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
                <v-row>
                  <v-col cols="12" class="d-flex justify-center">
                    <v-btn
                      dark
                      small
                      color="teal darken-4"
                      @click="emitiredit()"
                    >
                      AGREGAR
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-dialog v-model="atencion" persistent max-width="500px">
      <v-card color="red darken-4" dark rounded="lg">
        <v-card-title class="">
          <v-row
            ><v-col cols="12" class="text-center white--text"
              >SE ELIMINARÁ ESTE ELEMENTO</v-col
            ></v-row
          >
        </v-card-title>
        <v-card-text
          ><v-row
            ><v-col class="text-center"
              ><v-icon dark x-large>fas fa-exclamation-triangle</v-icon></v-col
            ></v-row
          ></v-card-text
        >
        <v-card-actions class="d-flex justify-center">
          <v-btn @click="dialogelCerrar" small>CANCELAR</v-btn>
          <v-btn @click="eliminar" small>ACEPTAR</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <tramites />
    <noticias />
    <atencion />
    <v-snackbar
      transition="slide-x-reverse-transition"
      v-model="snack"
      :timeout="timeout"
      color="red darken-3"
      dark
      rounded="pill"
      center
    >
      <h3 class="text-center">
        NO SE PUEDE ELIMINAR MIENTRAS HAYA TURNOS PENDIENTES
      </h3>
    </v-snackbar>
  </v-container>
</template>
<script>
import Multimedia from "../components/Multimedia.vue";
import Atencion from "../components/Atencion.vue";
import Noticias from "../components/Noticias.vue";
import Menua from "../components/Menua.vue";
import Menum from "../components/Menum.vue";
import store from "../store";
import { mapState } from "vuex";
import Tramites from "../components/Tramites.vue";

//import socketioService from '../service/socketio.service';

export default {
  components: {
    Multimedia,
    Atencion,
    Noticias,
    Menua,
    Menum,
    Tramites,
  },
  data: () => ({
    sede2: store.state.sede,
    sedeloading: false,
    sededisabled: true,
    snack: false,
    timeout: 3000,
  }),
  methods: {
    dialogelCerrar() {
      this.$store.commit("dialogel");
    },

    setSede() {
      this.sedeloading = true;
      this.$socket.emit("setSede", this.sede2.toUpperCase());
      this.sedeloading = false;
      this.sededisabled = true;
    },

    emitiredit() {
      this.$store.commit("abrirtramites");
    },

    eliminar() {
      let datos = {
        id: this.$store.state.id_eliminar,
        proceso: this.$store.state.proceso,
        archivo: this.$store.state.archivoeliminar,
      };
      if (datos.proceso == "tramite") {
        console.log(datos.proceso);
        if (!this.$store.state.turnos.some((v) => v.id_tramite === datos.id)) {
          this.$store.state.turnos.forEach((element) => {
            console.log(element.id_tramite);
          });
          this.$store.state.tramites.forEach((element) => {
            console.log(element.id_tramite);
          });
          //console.log("no hay turnos con este tramite")
          this.$socket.emit("eliminar", datos);
          this.$store.commit("dialogel");
        } else {
          console.log("si hay turnos con este tramite");
          this.$store.commit("dialogel");
          this.snack = true;
        }
      } else {
        console.log("no es tramite");
        this.$socket.emit("eliminar", datos);
        this.$store.commit("dialogel");
      }
    },

    abriratencion() {
      this.$store.commit("abriratencion");
    },

    abrirnoticias() {
      this.$store.commit("abrirnoticias");
    },
  },

  created() {
    if (!sessionStorage.usuario) {
      this.$router.push("/login");
    } else {
      if (JSON.parse(sessionStorage.usuario).usuario != "SUPER ADMINISTRADOR") {
        this.$router.push("/denegado");
      }
    }

    this.$store.dispatch("cambiar");
  },

  mounted() {
    this.sede2 = this.$store.state.sede;
  },

  computed: {
    ...mapState(["sede", "tramites", "noticias", "modulos", "media"]),

    atencion() {
      return this.$store.state.dialoge;
    },
  },

  watch: {
    sede(val) {
      this.sede2 = val;
    },
  },
  filters: {
    divisionfecha: function (value) {
      if (value) {
        let fechadividida = value.split("T");
        let fechacorrecta = fechadividida[0].split("-");
        return (
          fechacorrecta[2] + "-" + fechacorrecta[1] + "-" + fechacorrecta[0]
        );
      }
    },

    extension: (val) => {
      let ext = val.split(".");
      if (ext[1] == "png" || ext[1] == "jpg") {
        return "IMAGEN";
      }
      if (ext[1] == "mp4" || ext[1] == "mkv" || ext[1] == "wmv") {
        return "VIDEO";
      }
    },
  },
};
</script>

<style scoped>
.bordercard {
  border-style: solid;
  border-width: 2px;
  border-color: #004d40;
}
</style>
