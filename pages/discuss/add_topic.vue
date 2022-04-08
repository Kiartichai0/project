<template>
  <div>
    <v-card>
      <v-card-title class="justify-center ma-5"> ADD Topic </v-card-title>

        <v-form class="col-10" @submit="adddis">
          <h2>Title</h2>
          <v-text-field label="Question" v-model="title" />
          <h2>description</h2>
          <Editor v-model="info" />
          <br/>
          <v-btn type="submit"> Save </v-btn>
          <v-btn to="/discuss/discuss_main"> Back </v-btn>
        </v-form>
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
      title: "",
      info: "",
    };
  },
  methods: {
    async adddis(e) {
      e.preventDefault();
      //await console.log(this.role);

      const payload = {
        discuss: {
          title: this.title,
          description: this.info,
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

