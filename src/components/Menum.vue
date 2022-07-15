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
              fab
              text
              small
              color="red darken-2"
              @click="dialogel"
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
  name: "menum",
  props: {
    id: Number,
    index: Number,
    proceso: String,
    archivo: String,
  },
  methods: {
    dialogel() {
      let datos = { archivo: this.archivo, proceso: this.proceso };
      this.$store.commit("dialogel", datos);
    },
  },
};
</script>
