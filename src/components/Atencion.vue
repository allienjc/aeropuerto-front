<template>
  <v-dialog v-model="dialogatencion" max-width="400px" persistent>
    <v-card
      rounded="lg"
      style="background-image: linear-gradient(#004d40, #00796b)"
    >
      <v-card-title class="white--text">
        <span> AGREGAR MÓDULO</span>
      </v-card-title>
      <v-card-text class="">
        <v-form @submit.prevent="addatencion" ref="form" v-model="valid">
          <v-row>
            <v-col cols="7">
              <v-text-field
                autofocus
                v-model="nombre"
                background-color="white"
                filled
                color="teal"
                label="NOMBRE DEL MÓDULO"
                class="upper"
                :rules="[rules.required]"
                @focus="alert = false"
              ></v-text-field>
            </v-col>
            <v-col cols="5">
              <v-text-field
                v-model="numero"
                background-color="white"
                filled
                color="teal"
                label="NUMERO DEL MÓDULO"
                :rules="[rules.required]"
                type="number"
                min="0"
                @focus="alert2 = false"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-text-field
            v-model="pass"
            background-color="white"
            filled
            color="teal"
            label="CONTRASEÑA"
            :rules="[rules.required]"
          ></v-text-field>
          <v-row justify="center" class="">
            <v-col class="d-flex justify-space-around">
              <v-btn @click="cancelar" color="yellow lighten-2">CANCELAR</v-btn>
              <v-btn color="yellow lighten-2" type="submit">GUARDAR</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-text>
        <v-alert
          :value="alert"
          class="white"
          outlined
          type="error"
          dense
          transition="scale-transition"
        >
          EL NOMBRE DEL MODULO YA ESTA EN USO
        </v-alert>
        <v-alert
          :value="alert2"
          class="white"
          outlined
          type="error"
          dense
          transition="scale-transition"
        >
          EL NUMERO DEL MODULO YA ESTA EN USO
        </v-alert>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "atencion",
  data: () => ({
    alert: false,
    alert2: false,
    valid: true,
    nombre: "",
    pass: "",
    editar: false,
    id: null,
    numero: null,
    rules: {
      required: (v) => !!v || "Campo Obligatorio",
    },
  }),

  methods: {
    addatencion() {
      if (this.$refs.form.validate()) {
        if (!this.editar) {
          if (
            !this.$store.state.modulos.some((v) => {
              let nombresep = v.nombre_modulo.split(" ");
              let ultimo = nombresep.length;
              if (nombresep[ultimo - 1] == this.numero) {
                this.alert2 = true;
                return true;
              }
            })
          ) {
            console.log("nuevo");
            let datos = {
              nombre: `${this.nombre.toUpperCase()} ${this.numero}`,
              pass: this.pass,
            };
            this.$socket.emit("addatencion", datos);
            this.nombre = "";
            this.id = null;
            this.numero = null;
            this.editar = false;
            this.pass = "";
            this.$store.commit("abriratencion");
            this.$refs.form.resetValidation();
          }
        }
        if (this.editar) {
          let datos2 = {
            nombre: `${this.nombre.toUpperCase()} ${this.numero}`,
            pass: this.pass,
            id_modulo: this.id,
          };
          console.log("editando");
          this.$socket.emit("editaratencion", datos2);
          this.$refs.form.resetValidation();
          this.nombre = "";
          this.numero = null;
          this.id = null;
          this.editar = false;
          this.pass = "";
        }
      }
    },

    cancelar() {
      this.$refs.form.resetValidation();
      this.nombre = "";
      this.numero = null;
      this.pass = "";
      this.id = null;
      this.editar = false;
      this.alert2 = false;

      this.$store.commit("abriratencion");
    },
  },
  computed: {
    dialogatencion() {
      return this.$store.state.dialogatencion;
    },
    ...mapState(["opcion_editarmodulo"]),
  },
  watch: {
    opcion_editarmodulo(val) {
      if (val) {
        console.log("paso a editar modulo " + this.$store.state.idmoduloeditar);
        let nombresep = this.$store.state.moduloeditar.split(" ");
        let tamanoarray = nombresep.length;
        for (let i = 0; i <= tamanoarray - 2; i++) {
          this.nombre = `${this.nombre} ${nombresep[i]}`;
        }
        this.pass = this.$store.state.passworeditar;
        this.numero = nombresep[tamanoarray - 1];
        this.id = this.$store.state.idmoduloeditar;
        this.editar = val;
        console.log("editar desde modulos es: " + this.editar);
      }
    },
  },
};
</script>
<style scoped></style>
