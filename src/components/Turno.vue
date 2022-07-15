<template>
  <v-dialog v-model="dialogturno" max-width="400" persistent>
    <v-card
      rounded="lg"
      style="background-image: linear-gradient(#004d40, #00796b)"
    >
      <v-card-title class="white--text">
        <span> GENERAR TURNO</span>
      </v-card-title>
      <v-card-text class="">
        <v-form
          @submit.prevent="addturno"
          v-model="valid"
          ref="form"
          lazy-validation
        >
          <v-select
            :items="select"
            v-model="vmodel"
            item-text="nombre"
            item-value="id_tramite"
            dense
            color="teal"
            background-color="white"
            label="SELECCIONA"
            filled
            :rules="[rules.required]"
          >
          </v-select>
          <v-text-field
            v-model="nombre"
            background-color="white"
            filled
            color="teal"
            label="NOMBRE"
            counter
            maxlength="35"
            hint="opcional"
            persistent-hint
            class="upper"
          >
          </v-text-field>
          <v-row>
            <v-col class="text-center">
              <h1 class="font-weight-black white--text">{{ turnosig }}</h1>
            </v-col>
          </v-row>
          <v-row justify="center" class="">
            <v-col class="d-flex justify-space-around">
              <v-btn color="yellow lighten-2" @click="cancel">CANCELAR</v-btn>
              <v-btn color="yellow lighten-2" type="submit">GENERAR</v-btn>
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
  name: "turnos",
  data: () => ({
    valid: true,
    dialog: false,
    select: [],
    vmodel: "",
    turnosig: "",
    contador: null,
    nombre: "",
    rules: {
      required: (v) => !!v || "Campo Obligatorio",
    },
  }),
  computed: {
    ...mapState(["tramites", "turnos", "dialogturno"]),
  },
  methods: {
    addturno() {
      if (this.$refs.form.validate()) {
        let objetoturno = {
          turno: this.turnosig,
          id_tramite: this.vmodel,
          nombre: this.nombre.toUpperCase(),
        };
        this.$socket.emit("addturno", objetoturno);
        this.turnosig = "";
        this.nombre = "";
        this.vmodel = "";
        this.$refs.form.resetValidation();
        this.$store.commit("abrirturnos");
      }
    },

    cancel() {
      this.turnosig = "";
      this.nombre = "";
      this.vmodel = "";
      this.$refs.form.resetValidation();
      this.$store.commit("abrirturnos");
    },
  },

  watch: {
    tramites() {
      this.select = [];
      this.tramites.forEach((element) => {
        this.select.push({
          nombre: element.nombre_tramite,
          id_tramite: element.id_tramite,
        });
      });
    },

    vmodel(val) {
      if (val != "") {
        let ultimo;
        let letra = this.tramites.find((el) => el.id_tramite == this.vmodel);
        let tramiteturno = this.turnos.filter(
          (val) => val.id_tramite == this.vmodel
        );

        if (tramiteturno.length > 0) {
          let separado = tramiteturno[tramiteturno.length - 1].turno.split("-");
          console.log("ya tiene turno:  separado es" + separado[1]);
          ultimo = parseInt(separado[1]) + 1;
        } else {
          ultimo = 1;
        }
        this.turnosig = letra.identificador_tramite + "-" + ultimo;
      }
    },
  },
  created() {
    console.log(this.tramites);
    this.tramites.forEach((element) => {
      this.select.push({
        nombre: element.nombre_tramite,
        id_tramite: element.id_tramite,
      });
    });
  },
};
</script>
