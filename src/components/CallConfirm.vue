<template>
  <v-dialog max-width="450" v-model="dialogconfirm" persistent>
    <v-card elevation="24" color="teal darken-4" max-width="450" rounded="lg">
      <v-card-title class="white--text d-flex justify-center">
        <h3 class="mt-3">¿SE ATENDIÓ EL TURNO?</h3>
      </v-card-title>
      <v-card-text class="white--text d-flex justify-center">
        <h1>{{ turnollamar }}</h1>
      </v-card-text>
      <v-card-text>
        <v-row>
          <v-col cols="6" class="d-flex justify-center">
            <v-btn color="yellow lighten-1" fab large @click="confirm"
              ><v-icon>fas fa-check</v-icon></v-btn
            >
          </v-col>
          <v-col cols="6" class="d-flex justify-center">
            <v-btn color="yellow lighten-1" fab large @click="recall()"
              ><v-icon>fas fa-sync-alt</v-icon></v-btn
            >
          </v-col>
        </v-row>
        <v-row class="mt-n2">
          <v-col cols="6" class="d-flex justify-center white--text"
            ><h2>SI</h2></v-col
          >
          <v-col cols="6" class="d-flex justify-center white--text"
            ><h2>VOLVER A LLAMAR</h2></v-col
          >
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "CallConfirm",

  computed: {
    ...mapState(["turnollamar", "dialogconfirm", "turnos", "nombrellamar"]),
  },
  methods: {
    confirm() {
      let datos = { turno: this.turnollamar };

      if (this.turnos.some((v) => v.turno === this.turnollamar)) {
        this.$socket.emit("atendido", datos);
        this.$store.commit("abrirdialogconfirm");
      } else {
        this.$store.commit("snacktrue2");
      }
    },
    recall() {
      if (this.turnos.some((v) => v.turno === this.turnollamar)) {
        this.$store.commit("abrirdialogconfirm");
        let datos = { turno: this.turnollamar, nombre: this.nombrellamar };
        this.$store.commit("abrirsegundero", datos);
      } else {
        console.log("recall");
        this.$store.commit("abrirdialogconfirm");
        this.$store.commit("snacktrue2");
      }
    },
  },
};
</script>
