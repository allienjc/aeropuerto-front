<template>
  <v-dialog
    persistent
    v-model="dialogtramite"
    max-width="400px"
    transition="dialog-transition"
  >
    <v-card
      rounded="lg"
      style="background-image: linear-gradient(#004d40, #00796b)"
    >
      <v-card-title class="white--text">
        <span>{{ titulo }}</span>
      </v-card-title>
      <v-card-text class="">
        <v-form
          @submit.prevent="addtramite"
          v-model="valid"
          ref="form"
          lazy-validation
        >
          <v-text-field
            autofocus
            :rules="[rules.required]"
            v-model="tramite"
            background-color="white"
            filled
            color="teal"
            label="NOMBRE DEL TRÁMITE"
            class="upper"
          ></v-text-field>
          <v-row
            ><v-col width="200px">
              <v-text-field
                :rules="[rules.required]"
                v-model="letra"
                background-color="white"
                filled
                color="teal"
                label="LETRA IDENTIFICADORA"
                class="upper"
                maxlength="2"
                width="100px"
                @focus="resetalert"
              >
              </v-text-field> </v-col
          ></v-row>
          <v-row justify="center" class="">
            <v-col class="d-flex justify-space-around">
              <v-btn color="yellow lighten-2" @click="cancel">CANCELAR</v-btn>
              <v-btn color="yellow lighten-2" type="submit">GUARDAR</v-btn>
            </v-col>
          </v-row>
          <v-row
            ><v-alert
              :value="alert"
              class="white"
              outlined
              type="error"
              dense
              transition="scale-transition"
            >
              LA LETRA IDENTIFICADORA SE ENCUENTRA EN USO
            </v-alert></v-row
          >
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapState } from "vuex";
//import socketioService from "../service/socketio.service";
export default {
  name: "tramites",
  props: {
    //option
  },
  data: () => ({
    titulo: "AGREGAR TRAMITE",
    editar: false,
    alert: false,
    valid: true,
    tramite: "",
    letra: "",
    id: null,
    errorclass: "teal",
    rules: {
      required: (v) => !!v || "Campo Obligatorio",
    },
  }),

  methods: {
    //EDITAR
    addtramite() {
      if (this.editar) {
        console.log("thiseditar");
        if (
          this.$store.state.tramites.some(
            (v) => v.identificador_tramite === this.letra.toUpperCase()
          )
        ) {
          if (
            this.letra.toUpperCase() == this.$store.state.letratramite_editar
          ) {
            if (this.$refs.form.validate()) {
              let datos = {
                tramite: this.tramite.toUpperCase(),
                letra: this.letra.toUpperCase(),
                id: this.id,
              };
              //socketioService.editartramite(datos);
              this.$socket.emit("editartramite", datos);
              console.log("a punto de mandar alsocket.." + datos.letra);
              this.tramite = "";
              this.letra = "";
              this.id = null;
              this.alert = false;
              this.dialog = false;
              this.editar = false;
              this.$refs.form.resetValidation();
              this.$store.commit("abrirtramites");
            }
          } else {
            this.alert = true;
          }
        } else {
          if (this.$refs.form.validate()) {
            let datos = {
              tramite: this.tramite.toUpperCase(),
              letra: this.letra.toUpperCase(),
              id: this.id,
            };
            //socketioService.editartramite(datos);
            this.$socket.emit("editartramite", datos);
            console.log(
              "a punto de mandar alsocket.. con nueva letra" + datos.letra
            );
            this.tramite = "";
            this.letra = "";
            this.id = null;
            this.alert = false;
            this.dialog = false;
            this.editar = false;
            this.$refs.form.resetValidation();
            this.$store.commit("abrirtramites");
          }
        }
      } else {
        //AGREGAR NUEVO
        if (
          !this.$store.state.tramites.some(
            (v) => v.identificador_tramite === this.letra.toUpperCase()
          )
        ) {
          if (this.$refs.form.validate()) {
            let datos = {
              tramite: this.tramite.toUpperCase(),
              letra: this.letra.toUpperCase(),
            };
            this.$socket.emit("addtramite", datos);
            //socketioService.addtramite(datos);
            this.tramite = "";
            this.letra = "";
            this.alert = false;
            this.editar = false;
            this.dialog = false;
            this.$refs.form.resetValidation();
            this.$store.commit("abrirtramites");
          }
        } else {
          this.alert = true;
        }
      }
    },
    resetalert() {
      this.alert = false;
    },
    cancel() {
      this.tramite = "";
      this.editar = false;
      this.letra = "";
      this.dialog = false;
      this.$refs.form.resetValidation();
      this.alert = false;
      this.$store.commit("abrirtramites");
    },
  },

  computed: {
    dialogtramite() {
      return this.$store.state.dialogtramite;
    },
    ...mapState(["opcion_editartramites"]),
  },
  watch: {
    opcion_editartramites(val) {
      if (val) {
        console.log("editando");
        this.tramite = this.$store.state.tramite_editar;
        this.letra = this.$store.state.letratramite_editar;
        this.id = this.$store.state.idtramite_editar;
        this.editar = val;
        console.log("editar desde tramites es: " + this.editar);
      }
    },
  },
};
</script>
