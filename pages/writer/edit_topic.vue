<template>
  <div>
    <v-card>
      <v-card-title class="justify-center ma-5"> Edit Topic </v-card-title>
      <v-form class="col-12" @submit="addtopic">
        <v-text-field class="justify-center" label="Topic" v-model="title" />
        <v-textarea label="Descriptions" v-model="description" />
        <Editor v-model="content" />
        <v-btn class="ma-5" type="submit"> Save </v-btn>
        <v-btn
          class="ma-5"
          :to="{ path: '/writer/writer_topic', query: { id: id } }"
        >
          Back
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: this.$auth.user,
      id: this.$route.query.id,
      loggedIn: this.$auth.loggedIn,
      content:this.$route.query.data.content,
      description:this.$route.query.data.description,
      title:this.$route.query.data.title,
    };
  },
  methods: {
    async addtopic(e) {
      e.preventDefault();
      //await console.log(this.role);

      const payload = {
        data: {
          id: this.id,
          topid: this.$route.query.topid,
          title: this.title,
          description: this.description,
          content: this.content,
        },
      };

      //await alert(payload.subject.id);

      await this.$axios.$post("/edittopic", payload);
      await this.$router.push(`/writer/writer_topic?id=${this.$route.query.id}`);
    },
  },
};
</script>

