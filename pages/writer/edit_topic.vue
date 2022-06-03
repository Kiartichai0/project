<template>
  <div>
    <v-card>
      <v-card-title class="justify-center ma-5"> แก้ไขเนื้อหา </v-card-title>
      <v-card-text> {{this.$route.query.data}} </v-card-text>
      <v-form class="col-12" @submit="addtopic">
        <v-text-field class="justify-center" label="Topic" v-model="title" />
        <Editor v-model="content" />
        <v-btn class="ma-5" type="submit"> บันทึก </v-btn>
        <v-btn
          class="ma-5"
          :to="{ path: '/writer/writer_topic', query: { id: id } }"
        >
          กลับ
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
      topid:this.$route.query.data.topid
    };
  },
  methods: {
    async addtopic(e) {
      e.preventDefault();
      //await console.log(this.role);

      const payload = {
        data: {
          id: this.id,
          topid: this.topid,
          title: this.title,
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

