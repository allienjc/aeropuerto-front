<template>
  <v-dialog max-width="400" v-model="dialogconfirmar" persistent>
    <v-card color="teal darken-4" rounded="lg">
      <v-card-title class="white--text d-flex justify-center mb-5">
      </v-card-title>
      <v-card-text class="white--text d-flex justify-center">
        <h3>¿DESEA LLAMAR AL SIGUIENTE TURNO?</h3>
      </v-card-text>
      <v-card-actions class="d-flex justify-space-around">
        <v-btn @click="cancelar" color="yellow lighten-2">cancelar</v-btn>
        <v-btn @click="abrirsegundero()" color="yellow lighten-2"
          >aceptar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "confirmarllamado",
  data: () => ({}),
  methods: {
    aceptar() {},
    cancelar() {
      this.$store.commit("abrirconfirm");
    },
    abrirsegundero() {
      console.log("EL TRAMITE DESDE CONFIRMado ES: " + this.tramiteconfirmar);

      let turnosiguiente = this.turnos.filter(
        (val) =>
          val.estatus_turno == "PENDIENTE" &&
          val.id_tramite == this.tramiteconfirmar
      );
      if (turnosiguiente.length > 0) {
        let datos = {
          turno: turnosiguiente[0].turno,
          nombre: turnosiguiente[0].nombre,
        };
        console.log(turnosiguiente[0].nombre);
        this.$store.commit("abrirsegundero", datos);
      }
      this.$store.commit("abrirconfirm");
    },
    turnosig() {
      if (this.tramiteconfirmar) {
        let turnosiguiente = this.turnos.filter(
          (val) =>
            val.estatus_turno == "PENDIENTE" &&
            val.id_tramite == this.tramiteconfirmar
        );
        if (turnosiguiente.length > 0) {
          return turnosiguiente[0].turno;
        }
      }
    },
  },
  computed: {
    ...mapState(["turnos", "tramiteconfirmar", "dialogconfirmar"]),
  },
  created() {
    console.log("EL TRAMITE DESDE CONFIRM ES: " + this.tramiteconfirmar);
  },
};
</script>
