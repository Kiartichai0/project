<template>
  <div>
    <v-card >
      <v-card-title class="justify-center ma-5"> เพิ่มหัวข้อ </v-card-title>
        <v-form class="col-12" @submit="addtopic">
          <v-text-field class="justify-center" label="ชื่อหัวช้อ" v-model="title" />
          <p>เนื้อหา: </p>
          <Editor v-model="content"/>
          <v-btn class="ma-5" type="submit"> บันทึก </v-btn>
          <v-btn class="ma-5" :to="{ path: '/writer/writer_topic', query: { id: id } }"> กลับ </v-btn>
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
          content:this.content,
        },
      };
      await this.$axios.$post("/addtopic", payload);
      await this.$router.push(`/writer/writer_topic?id=${this.$route.query.id}`);
    },
  },
};
</script>

