<template>
  <v-dialog v-model="dialogdeleteall" max-width="450">
    <v-card color="red darken-4" dark rounded="lg">
      <v-card-title class="">
        <v-row
          ><v-col cols="12" class="text-center white--text"
            >SE ELIMINARÁN TODOS LOS TURNOS</v-col
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
        <v-btn small @click="cancelar">CANCELAR</v-btn>
        <v-btn small @click="deleteturnos">ACEPTAR</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    dialog: false,
  }),
  methods: {
    cancelar() {
      this.$store.commit("abrirdeleteall");
    },
    deleteturnos() {
      this.$socket.emit("deleteall");
      this.$store.commit("abrirdeleteall");
      this.$store.commit("deleterecuadro");
    },
  },
  computed: {
    ...mapState(["dialogdeleteall"]),
  },
};
</script>
