<template>
  <v-dialog v-model="dialog" max-width="600" persistent>
    <template v-slot:activator="{ on, attrs }">
      <v-btn dark small color="teal darken-4" v-bind="attrs" v-on="on">
        AGREGAR
      </v-btn>
    </template>

    <v-card
      rounded="lg"
      style="background-image: linear-gradient(#004d40, #00796b)"
      elevation="24"
    >
      <v-card-title class="d-flex justify-end"
        ><v-btn
          @click="cerrar"
          class="mt-n3 mr-n5"
          color="yellow lighten-2"
          x-small
          >X</v-btn
        >
      </v-card-title>
      <v-card-text>
        <VueFileAgent
          v-model="fileRecords"
          ref="vueFileAgent"
          :deletable="true"
          :helpText="'AGREGAR ARCHIVOS'"
          :multiple="true"
          :meta="true"
          :maxFiles="14"
          :accept="'image/*,video/*'"
          :errorText="{
            type: 'ARCHIVO IVALIDO, SOLO SE ADMITEN VIDEOS E IMAGENES',
          }"
          @select="filesSelected($event)"
          @beforedelete="onBeforeDelete($event)"
          @delete="fileDeleted($event)"
          @upload="onUpload($event)"
        ></VueFileAgent>
        <v-row>
          <v-col class="d-flex justify-center mt-5">
            <v-btn
              :disabled="!fileRecordsForUpload.length"
              @click="uploadFiles()"
              color="yellow lighten-2"
              >Upload {{ fileRecordsForUpload.length }} files</v-btn
            >
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
//import vueDropzone from "vue2-dropzone";

export default {
  name: "multimedia",

  data() {
    return {
      dialog: false,
      fileRecords: [],
      uploadUrl: "",
      fileRecordsForUpload: [],
      uploadHeaders: {},
    };
  },
  methods: {
    cerrar() {
      this.fileRecordsForUpload = [];
      this.fileRecords = [];
      this.dialog = false;
    },

    uploadFiles: function () {
      // Using the default uploader. You may use another uploader instead.
      console.log("subiendo");
      this.$refs.vueFileAgent.upload(
        "https://api-aeropuero.herokuapp.com/subir_archivo",
        this.uploadHeaders,
        this.fileRecordsForUpload
      );
      this.fileRecordsForUpload = [];
    },

    onUpload() {
      console.log("se subio");
      this.cerrar();
    },

    deleteUploadedFile: function (fileRecord) {
      // Using the default uploader. You may use another uploader instead.
      this.$refs.vueFileAgent.deleteUpload(
        this.uploadUrl,
        this.uploadHeaders,
        fileRecord
      );
    },
    filesSelected: function (fileRecordsNewlySelected) {
      var validFileRecords = fileRecordsNewlySelected.filter(
        (fileRecord) => !fileRecord.error
      );
      this.fileRecordsForUpload =
        this.fileRecordsForUpload.concat(validFileRecords);
      console.log(validFileRecords);
    },
    onBeforeDelete: function (fileRecord) {
      var i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        // queued file, not yet uploaded. Just remove from the arrays
        this.fileRecordsForUpload.splice(i, 1);
        var k = this.fileRecords.indexOf(fileRecord);
        if (k !== -1) this.fileRecords.splice(k, 1);
      } else {
        if (confirm("Are you sure you want to delete?")) {
          this.$refs.vueFileAgent.deleteFileRecord(fileRecord); // will trigger 'delete' event
        }
      }
    },
    fileDeleted: function (fileRecord) {
      var i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        this.fileRecordsForUpload.splice(i, 1);
      } else {
        this.deleteUploadedFile(fileRecord);
      }
    },
  },
};
</script>
