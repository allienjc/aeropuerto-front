<template>
  <v-row align="center">
    
    <video
      ref="video"
      :src="'https://api-aeropuero.herokuapp.com/uploads/'+ item"
      v-if="extension(item)"
      width="100%"
      autoplay
      muted
      @ended="emit"
    ></video>

    <v-img
      :src="'https://api-aeropuero.herokuapp.com/uploads/'+ item"
      v-else
      contain
      aspect-ratio="1.7"
      
    ></v-img>
  </v-row>
</template>
<script>
export default {
  name: "Windowitem",
  data: () => ({}),
  props: {
    item: String,
  },
  methods: {
    extension: (val) => {
      let ext = val.split(".");
      if (ext[1] == "png" || ext[1] == "jpg") {
        return false;
      }
      if (ext[1] == "mp4" || ext[1] == "mkv" || ext[1] == "wmv") {
        return true;
      }
    },

    emit() {
      this.$emit("terminado");
      this.$refs.video.load();
    },
  },
};
</script>
