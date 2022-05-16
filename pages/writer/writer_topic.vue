<template>
  <div>
    <v-row class="justify-center" v-for="i in sub[0].chapters" :key="i._id">
      <v-card class="ma-5" width="100%">
        <v-card-title> {{ i.title }} </v-card-title>
        <v-card-subtitle> {{ i.description }} </v-card-subtitle>
        <div class="ma-5 justify-center" v-html="i.content"/>
        <v-card-actions>
          <v-btn :to="{ path: '/writer/edit_topic', query: { id: id, data:i }}" > EDIT </v-btn>
          <v-btn @click="deltop(i)"> DELETE </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>

    <v-row class=" col-12 justify-center">
        <v-btn class="ma-5 pa-10"  width="15%" to="/writer/writer_main"> back </v-btn>
        <v-btn class="ma-5 pa-10" width="35%" :to="{ path: '/writer/add_topic', query: { id: id }}" > addtopic </v-btn>
        <v-btn class="ma-5 pa-10" width="35%" :to="{ path: '/writer/writer_quiz', query: { id: id }}"> quiz </v-btn>

      <!--v-card class="mr-5">
        <router-link to="/writer/writer_main">
          <v-card-title> back </v-card-title>
        </router-link>
      </v-card>
      <v-card class="mr-5">
        <nuxt-link :to="{
              path: '/writer/add_topic',
              query: { id: id },
            }" >
          <v-card-title> ADD TOPIC </v-card-title>
        </nuxt-link>
      </v-card>

      <v-card>
        <router-link to="/writer/writer_quiz">
          <v-card-title> quiz </v-card-title>
        </router-link>
      </v-card-->
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