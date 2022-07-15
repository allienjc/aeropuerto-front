<template>
  <v-menu offset-y transition="scale-transition">
    <template v-slot:activator="{ on, attrs }">
      <v-btn text color="black" small dark v-bind="attrs" v-on="on">
        <v-icon dark> fas fa-bars </v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item>
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              text
              fab
              small
              color="teal darken-4"
              @click="emitiredit"
            >
              <v-icon color="">fas fa-pencil-alt</v-icon>
            </v-btn>
          </template>
          <span>EDITAR</span>
        </v-tooltip>
      </v-list-item>
      <v-list-item>
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              fab
              text
              small
              color="red darken-2"
              @click="eliminar()"
            >
              <v-icon dark>fas fa-trash-alt</v-icon>
            </v-btn>
          </template>
          <span>ELIMINAR</span>
        </v-tooltip>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
export default {
  name: "menua",
  props: {
    id: Number,
    tramite: String,
    letra: String,
    proceso: String,
    noticia: String,
    password: String,
    nombre_modulo: String,
  },
  methods: {
    eliminar() {
      let datos = { id: this.id, proceso: this.proceso };
      this.$store.commit("dialogel", datos);
    },
    emitiredit() {
      if (this.proceso == "tramite") {
        let datos = { tramite: this.tramite, id: this.id, letra: this.letra };
        this.$store.commit("abrirtramites", datos);
      }
      if (this.proceso == "noticia") {
        let datos = {
          id_noticia: this.id,
          noticia: this.noticia,
          proceso: this.proceso,
        };
        this.$store.commit("abrirnoticias", datos);
      }
      if (this.proceso == "atencion") {
        let datos = {
          id_modulo: this.id,
          nombre_modulo: this.nombre_modulo,
          password_modulo: this.password,
          proceso: this.proceso,
        };
        this.$store.commit("abriratencion", datos);
      }
    },
  },
};
</script>
