<template>
  <v-container fluid>
    <v-row justify="center" class="yellow lighten-1 rounded-lg" dense>
      <v-col cols="12" class="text-center">
        <h2>
          {{ usuario
          }}<v-icon large color="black" class="ml-5">fas fa-door-open</v-icon>
        </h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-container fluid>
          <v-card rounded="lg" class="bordercard" elevation="24">
            <v-card-title class="teal--text text--darken-4">
              LLAMAR TURNO
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-row
                ><v-col
                  cols="12"
                  md="4"
                  v-for="(turnox, index) in objetoturnox"
                  :key="index"
                  class="d-flex justify-center"
                >
                  <transition name="fade">
                    <v-card
                      @click="confirm(turnox[0].id_tramite)"
                      rounded="lg"
                      width="300"
                      height="250"
                      dark
                      elevation="10"
                      :class="colores[Math.floor(Math.random() * 9)]"
                    >
                      <v-card-title
                        >{{ nombretramite(turnox[0].id_tramite) }}
                      </v-card-title>
                      <v-card-text
                        class="d-flex justify-center mt-5"
                        style="font-size: 3rem"
                      >
                        <span>{{ pendientes(turnox[0].id_tramite) }}</span>
                      </v-card-text>
                      <v-card-text class="d-flex justify-center">
                        TURNOS PENDIENTES
                      </v-card-text>
                      <v-card-actions class="d-flex justify-center">
                        LLAMAR
                      </v-card-actions>
                    </v-card>
                  </transition>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-container>
      </v-col>
    </v-row>
    <enviar />
    <CallConfirm />
    <mensajeturno />
    <llamarturno />
    <confirmacionllamado />
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import CallConfirm from "../components/CallConfirm.vue";
import Confirmacionllamado from "../components/Confirmacionllamado.vue";
import Enviar from "../components/Enviar.vue";
import Llamarturno from "../components/llamarturno.vue";
import Mensajeturno from "../components/Mensajeturno.vue";
export default {
  components: {
    Llamarturno,
    CallConfirm,
    Mensajeturno,
    Confirmacionllamado,
    Enviar,
  },
  data: () => ({
    colores: [
      "red darken-4",
      "purple darken-3",
      "indigo darken-3",
      "teal darken-4",
      "orange darken-4",
      "blue-grey darken-3",
      "green darken-4",
      "primary",
      "pink darken-2",
    ],
    objetoturnox: [],
    usuario: "",
  }),
  methods: {
    confirm(tramite) {
      if (this.pendientes(tramite) > 0)
        if (
          JSON.parse(sessionStorage.usuario).usuario == "ADMINISTRADOR" ||
          JSON.parse(sessionStorage.usuario).usuario == "SUPER ADMINISTRADOR"
        ) {
          this.$store.commit("abrirenviar", tramite);
        } else {
          this.$store.commit("abrirconfirm", tramite);
        }
    },

    cuadritos() {
      this.objetoturnox = [];
      this.tramites.forEach((element) => {
        console.log("buscando turno con id tramie : " + element.id_tramite);
        let objeto = this.turnos.filter(
          (val) => val.id_tramite === element.id_tramite
        );
        if (objeto.length > 0) {
          console.log("este es el objeto: " + objeto);
          this.objetoturnox.push(objeto);
        }
      });
    },
    pendientes(tramite) {
      let turnospendientes = this.turnos.filter(
        (val) => val.estatus_turno == "PENDIENTE" && val.id_tramite == tramite
      );
      console.log(turnospendientes);
      return turnospendientes.length;
    },

    nombretramite(id) {
      let variable = this.tramites.filter((val) => val.id_tramite == id);
      console.log(variable);
      return variable[0].nombre_tramite;
    },
  },
  created() {
    if (!sessionStorage.usuario) {
      this.$router.push("/login");
    }
    this.$store.dispatch("cambiar");
    this.cuadritos();
    this.usuario = JSON.parse(sessionStorage.usuario).usuario;
  },
  computed: {
    ...mapState([
      "turnos",
      "tramites",
      "objetoturnos",
      "objetotramites",
      "turnollamar",
      "modulo",
    ]),
  },
  watch: {
    turnos() {
      this.cuadritos();
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
