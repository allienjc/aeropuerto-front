<template>
  <v-dialog
    v-model="dialognoticia"
    max-width="400px"
    transition="dialog-transition"
    persistent
    ref="noti"
  >
    <v-card
      rounded="lg"
      style="background-image: linear-gradient(#004d40, #00796b)"
    >
      <v-card-title class="white--text">
        <span> AGREGAR NOTICIA</span>
      </v-card-title>
      <v-card-text class="">
        <v-form @submit.prevent="addnoticia" ref="form" v-model="valid">
          <v-textarea
            autofocus
            v-model="noticia"
            @keyup="toUpper()"
            @change="toUpper()"
            maxlength="300"
            counter
            auto-grow
            class="upper"
            background-color="white"
            color="teal"
            label="AGREGAR NOTICIA"
            filled
            :rules="[rules.required]"
          >
          </v-textarea>
          <v-row justify="center" class="">
            <v-col class="d-flex justify-space-around">
              <v-btn @click="cancelar" color="yellow lighten-2">CANCELAR</v-btn>
              <v-btn color="yellow lighten-2" type="submit">GUARDAR</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "noticias",
  data() {
    return {
      valid: true,
      noticia: "",
      editar: false,
      id: null,
      rules: {
        required: (v) => !!v || "Campo Obligatorio",
      },
    };
  },
  computed: {
    dialognoticia() {
      return this.$store.state.dialognoticia;
    },
    ...mapState(["opcion_editarnoticias"]),
  },

  methods: {
    toUpper() {
      this.noticia = this.noticia.toUpperCase();
    },
    addnoticia() {
      if (!this.editar) {
        if (this.$refs.form.validate()) {
          console.log("nuevo al socket: " + this.noticia);
          this.$socket.emit("addnoticia", this.noticia);
          this.noticia = "";
          this.$refs.form.resetValidation();
          this.$store.commit("abrirnoticias");
        }
      } else {
        if (this.$refs.form.validate()) {
          let datos = {
            noticia: this.noticia,
            id_noticia: this.id,
          };
          console.log("a punto de editar noticia al socket: " + this.noticia);
          this.$socket.emit("editarnoticia", datos);
          this.noticia = "";
          this.id = null;
          this.editar = false;
          this.$refs.form.resetValidation();
          this.$store.commit("abrirnoticias");
        }
      }
    },
    cancelar() {
      this.noticia = "";
      this.id = null;
      this.editar = false;
      this.$refs.form.resetValidation();
      this.$store.commit("abrirnoticias");
    },
  },
  watch: {
    opcion_editarnoticias(val) {
      if (val) {
        console.log("paso a editar noticia");
        this.noticia = this.$store.state.noticiaeditar;
        this.id = this.$store.state.idnoticiaeditar;
        this.editar = val;
        console.log("editar desde noticias es: " + this.editar);
      }
    },
  },
};
</script>
