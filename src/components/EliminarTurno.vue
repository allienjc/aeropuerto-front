<template>
  <v-dialog v-model="dialog" max-width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn text color="teal darken-4" v-bind="attrs" v-on="on">
        <v-icon color="red">fas fa-trash-alt</v-icon>
      </v-btn>
    </template>
    <v-card color="red darken-4" dark rounded="lg">
      <v-card-title class="">
        <v-row
          ><v-col cols="12" class="text-center white--text"
            >SE ELIMINARÁ EL TURNO {{ turno }}</v-col
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
        <v-btn small @click="deleteturno">ACEPTAR</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "eliminarturno",
  data: () => ({
    dialog: false,
    proceso: "turno",
  }),
  props: {
    id_turno: Number,
    turno: String,
  },
  methods: {
    deleteturno() {
      //console.log("los tunro son:   " + this.$store.state.turnos)
      console.log(this.turno);
      let datos = { turno: this.turno, proceso: this.proceso };
      this.$socket.emit("eliminar", datos);

      this.dialog = false;
    },

    cancelar() {
      this.dialog = false;
    },
  },
};
</script>
