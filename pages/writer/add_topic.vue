<template>
  <div>
    <h1>{{id}}</h1>
    <h1>{{title}}</h1>
    <h1>{{description}}</h1>
    <h1>{{content}}</h1>
    <v-card>
      <v-card-title class="justify-center ma-5"> ADD Topic </v-card-title>
        <v-form class="col-10" @submit="addtopic">
          <v-text-field class="justify-center" label="Topic" v-model="title" />
          <v-textarea label="Descriptions" v-model="description" />
          <Editor v-model="content"/>
          <v-btn class="ma-5" type="submit"> Save </v-btn>
          <v-btn class="ma-5"> Back </v-btn>
        </v-form>
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
    async addtopic(e) {
      e.preventDefault();
      //await console.log(this.role);

      const payload = {
        data: {
          id: this.$route.query.id,
          title:this.title,
          description:this.description,
          content:this.content,
        },
      };
      await this.$axios.$post("/addtopic", payload);
      await this.$router.push(`/writer/add_quiz?id=${this.this.$route.query.id}`);
    },
  },
};
</script>

