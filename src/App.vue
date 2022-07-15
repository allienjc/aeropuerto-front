<template>
  <v-app :style="{ background: '#CFD8DC' }">
    <nav>
      <v-navigation-drawer
        class=""
        v-if="$store.state.drawer && this.$router.currentRoute.name != 'Login'"
        bottom
        expand-on-hover
        dark
        style="background-image: linear-gradient(#004d40, #00796b)"
        fixed
        app
      >
        <v-list>
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                <v-icon>fas fa-user-cog</v-icon>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list nav>
          <v-list-item link :to="{ name: 'Dashboard' }" v-if="superad">
            <v-list-item-icon>
              <v-icon>fas fa-cogs</v-icon>
            </v-list-item-icon>
            <v-list-item-title>GENERAL</v-list-item-title>
          </v-list-item>
          <v-list-item
            link
            :to="{ name: 'Turnos' }"
            v-if="superad || administrador"
          >
            <v-list-item-icon>
              <v-icon>fas fa-ticket-alt</v-icon>
            </v-list-item-icon>
            <v-list-item-title>TURNOS</v-list-item-title>
          </v-list-item>
          <v-list-item link :to="{ name: 'Modulo' }">
            <v-list-item-icon>
              <v-icon>fas fa-door-open</v-icon>
            </v-list-item-icon>
            <v-list-item-title>MODULO</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </nav>

    <v-navigation-drawer
      v-if="$store.state.drawer && this.$router.currentRoute.name != 'Login'"
      class="d-sm-flex d-lg-none"
      right
      v-model="drawer"
      temporary
      app
      clipped
      style="background-image: linear-gradient(#004d40, #00796b)"
      dark
    >
      <v-list>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              <v-icon>fas fa-user-cog</v-icon>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list nav>
        <v-list-item link :to="{ name: 'Dashboard' }" v-if="superad">
          <v-list-item-icon>
            <v-icon>fas fa-cogs</v-icon>
          </v-list-item-icon>
          <v-list-item-title>GENERAL</v-list-item-title>
        </v-list-item>
        <v-list-item
          link
          :to="{ name: 'Turnos' }"
          v-if="superad || administrador"
        >
          <v-list-item-icon>
            <v-icon>fas fa-ticket-alt</v-icon>
          </v-list-item-icon>
          <v-list-item-title>TURNOS</v-list-item-title>
        </v-list-item>
        <v-list-item link :to="{ name: 'Modulo' }">
          <v-list-item-icon>
            <v-icon>fas fa-door-open</v-icon>
          </v-list-item-icon>
          <v-list-item-title>MODULO</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="teal darken-4" justify-end>
      <v-row justify="end" class="">
        <h1
          class="white--text mt-3 mr-5 d-none d-lg-flex"
          style="letter-spacing: 5px"
        >
          INSTITUTO MEXICANO DEL SEGURO SOCIAL
        </h1>
        <v-img
          src="./assets/logo.png"
          class="mt-1 d-none d-lg-flex mr-5"
          max-width="50px"
          max-height="50px"
        ></v-img>
      </v-row>
      <v-row class="">
        <v-img
          src="./assets/logo.png"
          class="d-flex justify-center ml-10 d-xs-flex d-lg-none mb-5"
          max-width="50px"
          max-height="50px"
        ></v-img>
        <v-spacer></v-spacer>
        <v-app-bar-nav-icon
          v-if="
            $store.state.drawer && this.$router.currentRoute.name != 'Login'
          "
          @click="drawer = true"
          class="white--text d-xs-flex d-lg-none mb-6"
        ></v-app-bar-nav-icon>
      </v-row>
    </v-app-bar>
    <v-main class="">
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
      <v-footer app color="teal darken-4" v-if="$store.state.footer">
        <v-carousel
          height="50"
          hide-delimiters
          v-model="paginanoticia"
          :show-arrows="false"
        >
          <v-carousel-item
            v-for="(noticia, index) in noticias"
            :key="index"
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
            <div>
              <h1
                :class="{
                  scrolltext1: noticias.length < 2,
                  scrolltext:
                    noticia.noticia.length >= 200 && noticias.length > 1,
                  scrolltext2:
                    noticia.noticia.length < 200 &&
                    noticia.noticia.length > 100 &&
                    noticias.length > 1,
                  scrolltext3:
                    noticia.noticia.length <= 100 && noticias.length > 1,
                }"
                style="font-size: 2vw"
                @animationend="cambiarnoticia"
              >
                {{ noticia.noticia }}
              </h1>
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-footer>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
//import SocketioService from "./service/socketio.service";
export default {
  name: "App",

  data: () => ({
    drawer: false,
    paginanoticia: 0,
    administrador: false,
    superad: false,
    normal: false,
  }),
  created() {
    console.log(this.turnosallamar);
  },
  mounted() {
    console.log("CREANDOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
    this.checaruser();
  },
  computed: {
    ...mapState([
      "isadmin",
      "issuperadmin",
      "noticias",
      "logged",
      "turnosallamar",
    ]),
  },
  watch: {
    logged() {
      this.checaruser();
    },
  },

  sockets: {
    connect: function () {
      console.log("conectaocoño");
    },
  },
  methods: {
    cambiarnoticia() {
      console.log("ya");
      this.paginanoticia++;
    },

    checaruser() {
      if (sessionStorage.usuario) {
        if (JSON.parse(sessionStorage.usuario).usuario == "ADMINISTRADOR") {
          this.administrador = true;
          // alert("ADMIN")
        }
        if (
          JSON.parse(sessionStorage.usuario).usuario == "SUPER ADMINISTRADOR"
        ) {
          this.superad = true;
        }
        if (
          JSON.parse(sessionStorage.usuario).usuario != "ADMINISTRADOR" &&
          JSON.parse(sessionStorage.usuario).usuario != "SUPER ADMINISTRADOR"
        ) {
          this.normal = true;
        }
      }
    },
  },
};
</script>
