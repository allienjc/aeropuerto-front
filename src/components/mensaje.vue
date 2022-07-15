<template>
  <v-snackbar
    transition="slide-x-reverse-transition"
    v-model="snack"
    :timeout="timeout"
    color="red"
    dark
    rounded="pill"
    absolute
    bottom
  >
    <p class="text-center">
      NO SE PUEDE ELIMINAR MIENTRAS HAYA TURNOS PENDIENTES
    </p>
  </v-snackbar>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "mensaje",
  data: () => ({
    timeout: 3000,
  }),
  computed: {
    ...mapState(["snack"]),
  },
};
</script>
