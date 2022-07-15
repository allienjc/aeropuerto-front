<template>
  <v-container class="fill-height">
    <v-row justify="center" class="white--text" align="center">
      <v-card
        color="teal darken-4"
        max-width="500"
        width="400"
        height="400"
        rounded="lg"
        elevation="24"
      >
        <v-card-text class="d-flex justify-center mt-15">
          <v-img
            src="@/assets/logo.png"
            max-width="150px"
            max-height="150px"
          ></v-img>
        </v-card-text>
        <v-card-title class="d-flex justify-center white--text">
          <h2>ACCESO DENEGADO!</h2>
        </v-card-title>
      </v-card>
    </v-row>
  </v-container>
</template>
<script>
export default {
  created() {
    this.$store.dispatch("cambiar");
  },
};
</script>
