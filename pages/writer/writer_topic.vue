<template>
  <div>
    <v-row class=" justify-center">
      <v-btn class="ma-auto my-2"  width="30%" to="/writer/writer_main"> กลับ </v-btn>
      <v-btn class="ma-auto my-2" width="30%" :to="{ path: '/writer/add_topic', query: { id: id }}" > เพิ่มหัวข้อ </v-btn>
      <v-btn class="ma-auto my-2" width="30%" :to="{ path: '/writer/writer_quiz', query: { id: id }}"> แบบทดสอบ </v-btn>
    </v-row>
    <v-row>
      <v-expansion-panels>
        <v-expansion-panel v-for="i in sub[0].chapters" :key="i._id">
          <v-expansion-panel-header>
            <h1>{{ i.title }}</h1>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-btn :to="{ path: '/writer/edit_topic', query: { id: id, data:i }}" > แก้ไข </v-btn>
            <v-btn @click="deltop(i)"> ลบ </v-btn>
            <div class="ma-5 justify-center" v-html="i.content"/>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>

  </div>
</template>

<script>
export default {
    async asyncData({ $axios, query }) {
      const sub = await $axios.$get(`/subject/${query.id}`);
      return { sub };
    },
  data() {
    return {
      user: this.$auth.user,
      id: this.$route.query.id,
      loggedIn: this.$auth.loggedIn,
    };
  },methods: {
    async deltop(x) {
      const payload = {
        data: {
          id:this.$route.query.id,
          topic: x,
        },
      };
      await this.$axios.$post("/deltopic", payload);
      await this.$nuxt.refresh();
    }
  },
};
</script>