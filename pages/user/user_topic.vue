<template>
  <div>
    <v-row  class="col-12 justify-center">
      <h1>{{ sub[0].title }}</h1>
    </v-row>
    <v-row
      class="col-12 justify-center"  v-for="i in sub[0].chapters"  :key="sub[0].chapters.indexOf(i)">
      <v-card width="80%">
        <!--router-link to="/user/user_content"-->
        <router-link  :to="{  path: '/user/user_content',  query: { content: sub[0].chapters , id:id, current:sub[0].chapters.indexOf(i)}  }" >
          <v-card-title> {{ i.title }} </v-card-title>
        </router-link>
        <v-card-text>{{ i.description }}</v-card-text>
      </v-card>
    </v-row>
    <v-row class=" col-12 justify-center">
      <v-card width="80%">
        <router-link :to="{  path: '/user/user_quiz',  query: { id:id }  }">
          <v-card-title> Quiz </v-card-title>
        </router-link>
      </v-card>
    </v-row>
    <v-row class="col-12 justify-center"
      ><v-btn to="/user/user_main">back</v-btn></v-row>
  </div>
</template>
<script>
export default {
    async asyncData({ $axios, query, $auth }) {
      const sub = await $axios.$get(`/subject/${query.id}`);
      //const quiz = await $axios.$get(`/quiz/${query.id}`);
      return { sub };
    },
    data() {
        return {
        user: this.$auth.user,
        id: this.$route.query.id,
        loggedIn: this.$auth.loggedIn,
        //score: sub[0].score.find(s => s.uid == user.id).score,
        };
    },
    
}
</script>
