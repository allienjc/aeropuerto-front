<template>
  <v-container class="fill-height">
    <v-row class="fill-height" align="center">
      <v-col class="d-flex justify-center">
        <v-card
          elevation="15"
          max-width="450"
          width="400"
          rounded="lg"
          style="background-image: linear-gradient(#004d40, #00796b)"
        >
          <v-card-title class="white--text">
            <h3>AEROPUERTO</h3>
            <v-spacer></v-spacer>
            <v-icon large color="white">fas fa-plane-departure</v-icon>
          </v-card-title>
          <v-divider class="yellow"></v-divider>
          <v-card-text class="d-flex justify-center mt-5">
            <v-img
              src="@/assets/logo.png"
              max-width="100px"
              max-height="100px"
            ></v-img>
          </v-card-text>
          <v-form
            @submit.prevent="login"
            v-model="valid"
            ref="form"
            lazy-validation
          >
            <v-card-text class="mb-5">
              <v-select
                :rules="[rules.required]"
                v-model="select"
                :items="objetologin"
                item-text="nombre_modulo"
                item-value="id_modulo"
                filled
                label="SELECCIONA"
                background-color="white"
                color="teal"
              >
              </v-select>
              <v-text-field
                :rules="[rules.required]"
                v-model="pass"
                filled
                background-color="white"
                label="CONTRASEÑA"
                type="password"
                color="teal"
              >
              </v-text-field>
            </v-card-text>

            <v-card-actions class="d-flex justify-center">
              <v-btn color="yellow" :loading="loading" large type="submit">
                LOGIN
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar
      transition="slide-x-reverse-transition"
      v-model="mensajelogin"
      color="red darken-3"
      dark
      rounded="pill"
      absolute
      bottom
    >
      <p class="text-center">CONTRASEÑA INCORRECTA</p>
    </v-snackbar>
  </v-container>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Login",
  data: () => ({
    select: "",
    pass: "",
    valid: true,
    loading: false,
    objetologin: [],
    rules: {
      required: (v) => !!v || "Campo Obligatorio",
    },
  }),
  created() {
    this.$store.dispatch("cambiar");
    console.log("creadooooooooo");
    this.objetologin = [];
    this.objetologin.unshift({
      id_modulo: "admin",
      nombre_modulo: "ADMINISTRADOR",
    });
    this.objetologin.unshift({
      id_modulo: "supersayayin",
      nombre_modulo: "SUPER ADMINISTRADOR",
    });
    this.$store.state.modulos.forEach((element) => {
      if (element.estatus_modulo == "CERRADO") {
        this.objetologin.push({
          id_modulo: element.id_modulo,
          nombre_modulo: element.nombre_modulo,
        });
      }
    });
  },
  mounted() {},
  methods: {
    login() {
      if (this.$refs.form.validate()) {
        let datos = { modulo: this.select, pass: this.pass };
        this.loading = true;
        this.$socket.emit("login", datos);
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }
    },
  },
  computed: {
    ...mapState(["modulos", "mensajelogin", "modulo"]),
  },
  watch: {
    modulo(val) {
      if (val == "ADMINISTRADOR") {
        this.$router.push("/turnos");
      } else if (val == "SUPER ADMINISTRADOR") {
        this.$router.push("/dashboard");
      } else {
        this.$router.push("/modulo");
      }
    },
    modulos() {
      this.objetologin = [];
      this.objetologin.unshift({
        id_modulo: "admin",
        nombre_modulo: "ADMINISTRADOR",
      });
      this.objetologin.unshift({
        id_modulo: "supersayayin",
        nombre_modulo: "SUPER ADMINISTRADOR",
      });
      this.$store.state.modulos.forEach((element) => {
        if (element.estatus_modulo == "CERRADO") {
          this.objetologin.push({
            id_modulo: element.id_modulo,
            nombre_modulo: element.nombre_modulo,
          });
        }
      });
    },
  },
};
</script>
