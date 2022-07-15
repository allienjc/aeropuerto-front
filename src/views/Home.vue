<template>
  <v-container fluid class="fill-height">
    <v-row class="fill-height">
      <v-col cols="12" class="d-flex justify-center"
        ><h2>{{ $store.state.sede }}</h2></v-col
      >

      <v-row no-gutters align="start">
        <v-col cols="7" class="pl-10">
          <v-carousel
            justify-center
            height="100%"
            hide-delimiters
            v-model="pagina"
            :show-arrows="false"
          >
            <v-carousel-item
              class=""
              v-for="(item, index) in media"
              :key="index"
            >
              <windowitem :item="item" @terminado="reiniciar" />
            </v-carousel-item>
          </v-carousel>

          <clock class="mt-5" />
        </v-col>

        <v-col cols="5" md="5" lg="5" xl="5" class="d-flex justify-center">
          <v-card
            color="white"
            elevation="24"
            width="80%"
            rounded="lg"
            height="100%"
          >
            <v-simple-table height="100%">
              <template v-slot:default>
                <thead class="teal darken-4">
                  <tr>
                    <th
                      class="text-center white--text"
                      style="letter-spacing: 2px"
                    >
                      <h1 style="font-size: 3vw">TURNO</h1>
                    </th>
                    <th
                      class="text-center white--text"
                      style="letter-spacing: 2px"
                    >
                      <h1 style="font-size: 3vw" class="ma-2">MÓDULO</h1>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="text-center"
                    style=""
                    v-for="(elemento, index) in recuadrotemporal"
                    :key="index"
                  >
                    <td
                      style="font-size: 5.3vw; border-bottom: 1px solid black"
                    >
                      {{ elemento.turno }}
                    </td>
                    <td
                      style="font-size: 5.3vw; border-bottom: 1px solid black"
                    >
                      {{ elemento.nombre_modulo | filtro }}
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </v-col>
        <!-- <v-row class="teal darken-4" no-gutters>
            <v-col>
            
          </v-row> -->
      </v-row>
    </v-row>
    <dialogllamar :turno="turno" :modulo="modulo" :nombre="nombre" />
  </v-container>
</template>

<script>
import { mapState } from "vuex";

import Clock from "../components/Clock.vue";
import Dialogllamar from "../components/Dialogllamar.vue";
import Windowitem from "../components/Windowitem.vue";

export default {
  name: "Home",
  components: {
    Clock,
    Windowitem,
    Dialogllamar,
  },

  data: () => ({
    //
    pagina: 0,
    fecha_mes: "",
    interval: null,
    bandera: false,
    turno: "",
    modulo: "",
    nombre: "",
    recuadrotemporal: [],
  }),
  methods: {
    reiniciar() {
      console.log("reiniciando");
      this.pagina++;
      this.interval = setInterval(this.cambiarpagina, 10000);
    },

    cambiarpagina() {
      if (this.extension(this.media[this.pagina])) {
        clearInterval(this.interval);
      } else {
        this.pagina++;
      }
    },
    extension: (val) => {
      let ext = val.split(".");
      if (ext[1] == "png" || ext[1] == "jpg") {
        return false;
      }
      if (ext[1] == "mp4" || ext[1] == "mkv" || ext[1] == "wmv") {
        return true;
      }
    },

    cola(datos) {
      var info = {
        turno: datos.turno,
        nombre_modulo: datos.nombre_modulo,
        nombre: datos.nombre,
      };
      this.turno = datos.turno;
      this.modulo = datos.nombre_modulo;
      this.nombre = datos.nombre;
      this.$socket.emit("eliminardecola", datos.id_turno);

      setTimeout(() => {
        this.turnosallamar.pop();
        this.$store.commit("cerrarprincipal");
        this.$store.commit("paginamenos");
        if (!this.recuadroprincipal.some((el) => el.turno == datos.turno)) {
          if (
            this.recuadroprincipal.some(
              (el) => el.nombre_modulo == datos.nombre_modulo
            )
          ) {
            let index = this.recuadroprincipal.findIndex(
              (val) => val.nombre_modulo == datos.nombre_modulo
            );
            this.recuadroprincipal.splice(index, 1);
            this.$socket.emit("deleterecuadro", datos.nombre_modulo);
            this.recuadroprincipal.unshift({
              turno: datos.turno,
              nombre_modulo: datos.nombre_modulo,
              nombre: datos.nombre,
            });
            this.$socket.emit("addrecuadro", info);
          } else {
            this.recuadroprincipal.unshift({
              turno: datos.turno,
              nombre_modulo: datos.nombre_modulo,
              nombre: datos.nombre,
            });
            this.$socket.emit("addrecuadro", info);
          }
        } else {
          let indexb = this.recuadroprincipal.findIndex(
            (el) => el.turno == datos.turno
          );
          this.recuadroprincipal.splice(indexb, 1);
          this.$socket.emit("deleteturnorecuadro", datos.turno);
          this.recuadroprincipal.unshift({
            turno: datos.turno,
            nombre_modulo: datos.nombre_modulo,
            nombre: datos.nombre,
          });
          this.$socket.emit("addrecuadro", info);
        }

        if (this.turnosallamar.length > 0) {
          setTimeout(() => {
            this.$store.commit("abrirprincipal");
          }, 2000);
        }
      }, 15000);
    },
  },
  mounted() {
    let fecha = new Date();
    this.fecha_mes = `${fecha.getHours()} : ${fecha.getMinutes()}`;
    this.interval = setInterval(this.cambiarpagina, 10000);
    console.log(this.media)
  },
  created() {
    this.recuadrotemporal = this.recuadroprincipal.slice(0, 4);
  },
  computed: {
    ...mapState([
      "media",
      "turnosallamar",
      "dialogprincipal",
      "paginax",
      "recuadroprincipal",
    ]),
    letras() {
      if (this.$vuetify.breakpoint.name == "xl") {
        return 6.5;
      }
      if (this.$vuetify.breakpoint.name == "lg") {
        return 5.2;
      } else {
        return 4;
      }
    },
  },
  watch: {
    dialogprincipal(val) {
      console.log("SE ACTIVO EL WATCHER DE DIALOGPRINCIPAL");
      if (val) this.cola(this.turnosallamar[this.turnosallamar.length - 1]);
    },
    recuadroprincipal() {
      console.log("se activo el watch de recuadro principal");
      this.recuadrotemporal = this.recuadroprincipal.slice(0, 4);
    },
  },
  filters: {
    filtro: function (val) {
      let numero = val.split(" ");
      return numero[numero.length - 1];
    },
  },
};
</script>
<style scoped></style>
