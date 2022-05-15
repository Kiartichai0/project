<template>
  <div>
    <v-card >
      <v-card-title class="justify-center ma-5"> ADD Topic </v-card-title>
        <v-form class="col-12" @submit="addtopic">
          <v-text-field class="justify-center" label="Topic" v-model="title" />
          <v-textarea label="Descriptions" v-model="description" />
          <Editor v-model="content"/>
          <v-btn class="ma-5" type="submit"> Save </v-btn>
          <v-btn class="ma-5" :to="{ path: '/writer/writer_topic', query: { id: id } }"> Back </v-btn>
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
      await this.$router.push(`/writer/writer_topic?id=${this.$route.query.id}`);
    },
  },
};
</script>

