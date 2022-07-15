<template>
  <v-container fluid class="over">
    <v-dialog
      v-model="dialogprincipal"
      max-width="1000"
      class="over"
      overlay-opacity=".9"
      persistent
      transition="fade-transition"
    >
      <v-carousel
        justify-center
        height="100%"
        hide-delimiters
        v-model="paginax"
        :show-arrows="false"
      >
        <v-carousel-item>
          <v-card>
            <v-card-title
              style="font-size: 2rem"
              class="teal darken-3 d-flex justify-center"
            >
              <h1 class="white--text my-10" style="letter-spacing: 5px">
                SIGUIENTE TURNO
              </h1>
            </v-card-title>
            <div class="over text-center">
              <h1 style="font-size: 20rem" class="over">{{ turno }}</h1>
            </div>

            <div class="over text-center">
              <h1 style="font-size: 3vw" class="over">{{ nombre }}</h1>
            </div>
          </v-card>
        </v-carousel-item>
        <v-carousel-item>
          <v-card>
            <v-card-title
              style="font-size: 2rem"
              class="teal darken-3 d-flex justify-center"
            >
              <h1 class="white--text my-10" style="letter-spacing: 5px">
                MÓDULO
              </h1>
            </v-card-title>
            <div class="over text-center">
              <h1 style="font-size: 20rem" class="over">
                {{ modulo | filtro }}
              </h1>
            </div>
          </v-card>
        </v-carousel-item>
      </v-carousel>
    </v-dialog>
  </v-container>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Dialogllamar",
  props: {
    turno: String,
    modulo: String,
    nombre: String,
  },
  data: () => ({
    mostrar: true,
    titulo: "SIGUIENTE TURNO",
  }),
  methods: {
    run() {
      setTimeout(() => {
        this.$store.commit("paginamas");
      }, 10000);
    },
  },
  created() {},
  computed: {
    ...mapState(["dialogprincipal", "paginax"]),
  },

  watch: {
    dialogprincipal(val) {
      if (val) {
        this.run();
      }
    },
  },

  filters: {
    filtro: function (val) {
      let numero = val.split(" ");
      return numero[numero.length - 1];
    },
  },
};
</script>
<style scoped>
.over {
  overflow: hidden;
}

.transicion-enter-active {
  transition: all 0.3s ease;
}
.transicion-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.transicion-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
