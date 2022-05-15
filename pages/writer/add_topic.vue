<template>
  <div>
    <h1>{{id}}</h1>
    <v-card>
      <v-card-title class="justify-center ma-5"> ADD Topic </v-card-title>
      <center>
        <v-form class="col-10">
          <v-text-field label="Topic" v-model="title" />
          <v-textarea label="Descriptions" v-model="description" />

          <v-btn to="/writer/writer_main"> Save </v-btn>
          <v-btn to="/writer/writer_main"> Back </v-btn>
        </v-form>
      </center>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.query.id,
      title: "",
      description: "",
      content: "",
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
            },
          },
        },
      };
      await this.$axios.$post("/addsubject", payload);
    },
  },
};
</script>

