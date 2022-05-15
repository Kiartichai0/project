<template>
  <div>
    <v-row class="justify-center" v-for="i in subject" :key="i._id">
      <v-card class="ma-5" width="100%">
        <v-card-title> {{ i.title }} </v-card-title>
        <div class="ma-5 justify-center" v-html="i.info"/>
        <v-card-actions>
          <v-btn to="/writer/edit_topic"> EDIT </v-btn>
          <v-btn> DELETE </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>

    <v-row class="col-12 justify-center">
      <v-card class="mr-5">
        <router-link to="/writer/writer_main">
          <v-card-title> back </v-card-title>
        </router-link>
      </v-card>
      <v-card class="mr-5">
        <router-link to="/writer/add_topic">
          <v-card-title> ADD TOPIC </v-card-title>
        </router-link>
      </v-card>

      <v-card>
        <router-link to="/writer/writer_quiz">
          <v-card-title> quiz </v-card-title>
        </router-link>
      </v-card>
    </v-row>
  </div>
</template>

<script>
export default {
  /*async asyncData({ $axios }) {
      const subject = await $axios.$get('/subject/62051cc5a5fed0bf9e5ed4a7');
      return { subject };
    },*/
  data() {
    return {
      user: this.$auth.user,
      subject: this.$route.query.subject,
      id: this.$route.query.id,
      title: this.$route.query.title,
      loggedIn: this.$auth.loggedIn,
    };
  },
};
</script>