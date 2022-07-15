<template>
  <v-dialog max-width="400" v-model="dialogenviar" persistent>
    <v-card color="teal darken-4" rounded="lg">
      <v-card-title class="white--text">
        ENVIAR SIGUIENTE TURNO A:
      </v-card-title>
      <v-form @submit.prevent="abrirsegundero" ref="form" v-model="valid">
        <v-card-text>
          <v-select
            v-model="select"
            :items="modulos"
            item-text="nombre_modulo"
            item-value="nombre_modulo"
            :rules="[rules.required]"
            filled
            label="SELECCIONA"
            background-color="white"
            color="teal"
            @focus="alert = false"
          >
          </v-select>
        </v-card-text>
        <v-card-actions class="d-flex justify-space-around">
          <v-btn @click="cancelar" color="yellow lighten-2" class="mb-5"
            >cancelar</v-btn
          >
          <v-btn type="submit" color="yellow lighten-2" class="mb-5"
            >aceptar</v-btn
          >
        </v-card-actions>
      </v-form>
      <v-card-text>
        <v-alert
          :value="alert"
          class="white"
          outlined
          type="error"
          dense
          transition="scale-transition"
        >
          ¡MODULO CERRADO!
        </v-alert>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Enviar",
  data: () => ({
    rules: {
      required: (v) => !!v || "Campo Obligatorio",
    },
    valid: true,
    select: "",
    alert: false,
  }),
  computed: {
    ...mapState(["modulos", "dialogenviar", "tramiteconfirmar", "turnos"]),
  },
  methods: {
    cancelar() {
      this.$refs.form.resetValidation();
      this.alert = false;
      this.select = "";
      this.$store.commit("abrirenviar");
    },

    abrirsegundero() {
      if (this.$refs.form.validate()) {
        let turnosiguiente = this.turnos.filter(
          (val) =>
            val.estatus_turno == "PENDIENTE" &&
            val.id_tramite == this.tramiteconfirmar
        );
        if (turnosiguiente.length > 0) {
          let datos = {
            turno: turnosiguiente[0].turno,
            nombre_modulo: this.select,
            nombre: turnosiguiente[0].nombre,
          };
          console.log(this.select);
          this.$store.commit("abrirsegundero", datos);
        }
        this.select = "";
        this.$store.commit("abrirenviar");
        this.$refs.form.resetValidation();
      }
    },
  },
};
</script>
