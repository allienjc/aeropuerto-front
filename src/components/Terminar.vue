<template>
  <v-dialog v-model="dialog" max-width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn text color="teal darken-4" v-bind="attrs" v-on="on">
        <v-icon color="green">fas fa-check</v-icon>
      </v-btn>
    </template>
    <v-card color="teal darken-4" dark rounded="lg">
      <v-card-title class="">
        <v-row
          ><v-col cols="12" class="text-center white--text"
            >TERMINAR TURNO
          </v-col></v-row
        >
      </v-card-title>
      <v-card-text class="text-center"
        ><h3 class="white--text">
          EL TURNO {{ turno }} SE MARCARÁ COMO TERMINADO
        </h3>
      </v-card-text>
      <v-card-actions class="d-flex justify-space-around">
        <v-btn color="yellow lighten-2" class="black--text" @click="cancelar"
          >CANCELAR</v-btn
        >
        <v-btn
          color="yellow lighten-2"
          class="black--text"
          @click="terminarturno"
          >ACEPTAR</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "Terminar",
  data: () => ({
    dialog: false,
  }),
  props: {
    turno: String,
  },
  methods: {
    cancelar() {
      this.dialog = false;
    },

    terminarturno() {
      let datos = { turno: this.turno };
      this.$socket.emit("atendido", datos);
      this.dialog = false;
    },
  },
};
</script>
