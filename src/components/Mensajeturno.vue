<template>
  <v-snackbar
    transition="slide-x-reverse-transition"
    v-model="snack2"
    color="red"
    dark
    rounded="pill"
    absolute
    bottom
  >
    <p class="text-center">NO SE ENCUENTRA O YA SE HA ELIMINADO EL TURNO</p>
  </v-snackbar>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "mensaje",

  computed: {
    ...mapState(["snack2"]),
  },
};
</script>
