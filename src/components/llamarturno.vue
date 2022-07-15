<template>
  <v-dialog v-model="segundero" persistent max-width="400">
    <v-card
      color="teal darken-4"
      class="bordercard"
      max-width="400"
      rounded="lg"
    >
      <div class="scene">
        <svg
          version="1.1"
          id="dc-spinner"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 38 38"
          preserveAspectRatio="xMinYMin meet"
        >
          <text
            x="12"
            y="21"
            font-size="2px"
            style="letter-spacing: 0.6"
            fill="white"
          >
            LLAMANDO
            <animate
              attributeName="opacity"
              values="0;1;0"
              dur="1.8s"
              repeatCount="indefinite"
            />
          </text>
          <path
            fill="#373a42"
            d="M20,35c-8.271,0-15-6.729-15-15S11.729,5,20,5s15,6.729,15,15S28.271,35,20,35z M20,5.203
    C11.841,5.203,5.203,11.841,5.203,20c0,8.159,6.638,14.797,14.797,14.797S34.797,28.159,34.797,20
    C34.797,11.841,28.159,5.203,20,5.203z"
          ></path>

          <path
            fill="#373a42"
            d="M20,33.125c-7.237,0-13.125-5.888-13.125-13.125S12.763,6.875,20,6.875S33.125,12.763,33.125,20
    S27.237,33.125,20,33.125z M20,7.078C12.875,7.078,7.078,12.875,7.078,20c0,7.125,5.797,12.922,12.922,12.922
    S32.922,27.125,32.922,20C32.922,12.875,27.125,7.078,20,7.078z"
          ></path>

          <path
            fill="#B71C1C"
            stroke="#00796B"
            stroke-width="0.6027"
            stroke-miterlimit="10"
            d="M5.203,20
			c0-8.159,6.638-14.797,14.797-14.797V5C11.729,5,5,11.729,5,20s6.729,15,15,15v-0.203C11.841,34.797,5.203,28.159,5.203,20z"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 20 20"
              to="360 20 20"
              calcMode="spline"
              keySplines="0.4, 0, 0.2, 1"
              keyTimes="0;1"
              dur="2s"
              repeatCount="indefinite"
            />
          </path>

          <path
            fill="#859900"
            stroke="#FFEE58"
            stroke-width="0.2027"
            stroke-miterlimit="10"
            d="M7.078,20
  c0-7.125,5.797-12.922,12.922-12.922V6.875C12.763,6.875,6.875,12.763,6.875,20S12.763,33.125,20,33.125v-0.203
  C12.875,32.922,7.078,27.125,7.078,20z"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 20 20"
              to="360 20 20"
              dur="1.8s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </div>
      <v-card-text class="white--text d-flex justify-center">
        <h2>{{ turnollamar }}</h2>
        <v-spacer></v-spacer>
        <h3>{{ segundos }} seg...</h3>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "llamarturno",
  data: () => ({
    segundos: 0,
    interval: null,
  }),
  created() {
    console.log("SE ABRIO EL SEGUNDERO");
  },
  methods: {
    contador() {
      if (this.segundos > 0) {
        this.segundos--;
      } else {
        if (this.segundero == true) {
          clearInterval(this.interval);
          console.log("llamando a dialog confirm");
          this.$store.commit("abrirdialogconfirm", this.turnollamar);
          let datos = { turno: this.turnollamar, nombre: this.nombrellamar };
          this.$store.commit("abrirsegundero", datos);
        }
      }
    },
  },
  watch: {
    segundero(val) {
      if (val === true) {
        console.log("se activo el watcher con true");
        this.segundos = 10;
        this.interval = setInterval(this.contador, 1000);
        let datos;
        if (
          JSON.parse(sessionStorage.usuario).usuario == "ADMINISTRADOR" ||
          JSON.parse(sessionStorage.usuario).usuario == "SUPER ADMINISTRADOR"
        ) {
          datos = {
            turno: this.turnollamar,
            nombre_modulo: this.moduloenviar,
            nombre: this.nombrellamar,
          };
        } else {
          datos = {
            turno: this.turnollamar,
            nombre_modulo: JSON.parse(sessionStorage.usuario).usuario,
            nombre: this.nombrellamar,
          };
        }
        this.$socket.emit("llamando", datos);
      }
    },
  },
  computed: {
    ...mapState(["segundero", "turnollamar", "moduloenviar", "nombrellamar"]),
  },
};
</script>
<style lang="scss" scoped>
/* Demo Styles - It's all in the SVG  */
html {
  height: 100%;
  min-height: 100%;
  overflow: hidden;

  body {
    height: 100%;
    min-height: 100%;
  }
}
.bordercard {
  border-style: solid;
  border-width: 5px;
  border-color: #ffffff;
}

.scene {
  width: 100%;
  height: 100%;
  perspective: 600;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 240px;
    height: 240px;
  }
}

@keyframes arrow-spin {
  50% {
    transform: rotateY(360deg);
  }
}
</style>
