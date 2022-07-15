<template>
  <v-row justify="center" dense>
    <h1 class="text-center" style="font-size: 6vw; color: #004d40">
      {{ hours | toHuman }}:{{ minutes | toHuman }} {{ final }}
    </h1>
  </v-row>
</template>

<script>
export default {
  name: "clock",
  data: () => ({
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
    seconds: new Date().getSeconds(),
    final: "",
  }),
  mounted() {
    this.timer = setInterval(this.tick, 5000);
    this.hours = new Date().getHours();
    if (this.hours > 11) {
      this.final = "PM";
    } else {
      this.final = "AM";
    }
  },
  methods: {
    tick() {
      this.hours = new Date().getHours();
      this.minutes = new Date().getMinutes();
      this.seconds = new Date().getSeconds();
      if (this.hours > 11) {
        this.final = "PM";
      } else {
        this.final = "AM";
      }
    },
  },
  filters: {
    toHuman: (f) => f.toString().padStart(2, "0"),
  },
};
</script>
<style scoped>
.html-clock {
  display: grid;
  grid-template-columns: 1fr 0.2fr 1fr 0.2fr 1fr 0.2fr;
  margin: 0 auto;
}
.sep {
  animation: blink 1s linear infinite;
}
@keyframes blink {
  0%,
  49% {
    opacity: 1;
  }
  50%,
  100% {
    opacity: 0;
  }
}
</style>
