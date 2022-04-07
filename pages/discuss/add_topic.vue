<template>
  <div>
    <v-card>
      <v-card-title class="justify-center ma-5"> ADD Topic </v-card-title>
      <center>
        <v-form class="col-10" @submit="adddis">
          <Editor v-model="info" />

          <br/>


          <v-btn type="submit"> Save </v-btn>
          <v-btn to="/writer/writer_main"> Back </v-btn>
        </v-form>
      </center>
    </v-card>
  </div>
</template>

<script>
import Editor from "../../components/Editor";

export default {
  components: {
    Editor,
  },

  data() {
    return {
      info: "",
    };
  },
  methods: {
    async adddis(e) {
      e.preventDefault();
      //await console.log(this.role);

      const payload = {
        discuss: {
          title: this.info,
          comments: {
          },
        },
      };
      await this.$axios.$post("/adddiscuss", payload);
      //await this.$router.push("/writer/writer_main");
    },
  },
};
</script>

