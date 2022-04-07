<template>
  <div>
    <v-card>
      <v-card-title class="justify-center ma-5"> ADD Subject </v-card-title>
      <center>
        <v-form class="col-10" @submit="addsubject">
          <v-text-field label="Subject name" v-model="title" />
          <v-text-field label="Chapter 1 Title" v-model="chapter" />
          <v-text-field label="Chapter 1 Picture link" v-model="img" />
          <v-textarea label="Chapter 1 Description" v-model="description" />
          <h1 class="display-1">
            Chapter 1 Contents
          </h1>
          <Editor v-model="info" />

          <div v-html="info"></div>

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
      title: "",
      chapter: "",
      description: "",
      content: "",
      img: "",
    };
  },
  methods: {
    async addsubject(e) {
      e.preventDefault();
      //await console.log(this.role);

      const payload = {
        subject: {
          title: this.title,
          content: {
            chapter1: {
              title: this.chapter,
              description: this.description,
              content: this.content,
              img: this.img,
              info: this.info,
            },
          },
        },
      };
      await this.$axios.$post("/addsubject", payload);
      await this.$router.push("/writer/writer_main");
    },
  },
};
</script>

