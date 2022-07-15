<template>
  <v-container fluid class="">
    <v-row justify="center" class="yellow lighten-1 rounded-lg" dense>
      <v-col cols="12" class="text-center">
        <h2>
          CREACIÓN DE TURNOS<v-icon large color="black" class="ml-5"
            >fas fa-ticket-alt</v-icon
          >
        </h2>
      </v-col>
    </v-row>
    <v-row class="">
      <v-col cols="12" class="text-end">
        <v-tooltip v-model="tooleliminar" bottom>
          <template v-slot:activator="{ on, attrs }"
            ><v-btn
              v-bind="attrs"
              v-on="on"
              fab
              color="teal darken-4"
              @click="dialogdeleteall()"
              class="mr-5"
              ><v-icon color="white">fas fa-sync-alt</v-icon></v-btn
            >
          </template>
          <span>REINICIAR TURNOS</span>
        </v-tooltip>
        <v-tooltip v-model="toolagregar" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              fab
              color="teal darken-4"
              @click="abrirdialog()"
            >
              <v-icon color="white">fas fa-plus</v-icon></v-btn
            >
          </template>
          <span>AGREGAR NUEVO TURNO</span>
        </v-tooltip>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-container fluid>
          <v-card rounded="lg" class="bordercard mt-n4" elevation="24">
            <v-card-title class="teal--text text--darken-4">
              TURNOS
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="fas fa-search"
                label="BUSCAR TURNO"
                single-line
                hide-details
                color="teal"
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="items"
              :items-per-page="10"
              :search="search"
              height="400"
              fixed-header
            >
              <template v-slot:item.acciones="{ item }">
                <terminar :turno="item.turno" />
                <eliminar-turno :id_turno="item.id_turno" :turno="item.turno" />
              </template>
            </v-data-table>
          </v-card>
        </v-container>
      </v-col>
    </v-row>
    <turno />
    <delete-confirm />
    <enviar />
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import DeleteConfirm from "../components/DeleteConfirm.vue";
import EliminarTurno from "../components/EliminarTurno.vue";
import Enviar from "../components/Enviar.vue";
import Terminar from "../components/Terminar.vue";
import Turno from "../components/Turno.vue";

export default {
  components: {
    Turno,
    EliminarTurno,
    DeleteConfirm,
    Terminar,
    Enviar,
  },

  data: () => ({
    tool: false,
    tooleliminar: false,
    toolagregar: false,
    headers: [
      {
        text: "TURNO",
        align: "center",
        value: "turno",
        class: "teal darken-4 white--text",
        cellClass: "font-weight-black",
        sortable: false,
        divider: true,
      },
      {
        text: "TRAMITE",
        align: "center",
        value: "tramite",
        class: "teal darken-4 white--text",
        cellClass: "font-weight-medium",
        divider: true,
        sortable: false,
      },
      {
        text: "NOMBRE",
        align: "center",
        value: "nombre",
        class: "teal darken-4 white--text",
        cellClass: "font-weight-medium",
        divider: true,
        sortable: false,
      },
      {
        text: "ESTATUS",
        value: "estatus",
        cellClass: "font-weight-medium",
        class: "teal darken-4 white--text",
        divider: true,
        align: "center",
        sortable: false,
      },
      {
        text: "MODULO",
        value: "modulo",
        class: "teal darken-4 white--text",
        cellClass: "font-weight-medium",
        divider: true,
        align: "center",
        sortable: false,
      },
      {
        text: "ACCIONES",
        value: "acciones",
        class: "teal darken-4 white--text",
        divider: true,
        align: "center",
        sortable: false,
      },
    ],
    items: [{}],
    search: "",
    nombremodulo: "",
  }),
  methods: {
    iniciar() {
      let objetoturnos = [];
      this.turnos.forEach((element) => {
        let tramite = this.tramites.find(
          (el) => el.id_tramite == element.id_tramite
        );

        objetoturnos.push({
          turno: element.turno,
          tramite: tramite.nombre_tramite,
          nombre: element.nombre,
          estatus: element.estatus_turno,
          modulo: element.id_modulo,
          id_turno: element.id_turno,
        });
      });
      this.items = objetoturnos;
    },

    abrirdialog() {
      console.log("abriendo dialog");
      this.$store.commit("abrirturnos");
    },
    dialogdeleteall() {
      this.$store.commit("abrirdeleteall");
    },
  },

  created() {
    if (!sessionStorage.usuario) {
      this.$router.push("/login");
    } else {
      if (
        JSON.parse(sessionStorage.usuario).usuario != "ADMINISTRADOR" &&
        JSON.parse(sessionStorage.usuario).usuario != "SUPER ADMINISTRADOR"
      ) {
        this.$router.push("/denegado");
      }
    }
    this.$store.dispatch("cambiar");
    this.iniciar();
  },
  computed: {
    ...mapState(["turnos", "tramites", "modulos"]),
  },
  watch: {
    turnos() {
      let objetoturnos = [];
      this.turnos.forEach((element) => {
        let tramite = this.tramites.find(
          (el) => el.id_tramite == element.id_tramite
        );

        objetoturnos.push({
          turno: element.turno,
          tramite: tramite.nombre_tramite,
          nombre: element.nombre,
          estatus: element.estatus_turno,
          modulo: element.id_modulo,
          id_turno: element.id_turno,
        });
      });
      this.items = objetoturnos;
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
