<template>
  <div>
    <v-row class="col-12 justify-center" v-for="i in subject" :key="i._id">
      <v-card>
        <v-card-title> {{ i.title }} </v-card-title>
        <v-card-subtitle> {{ i.description }} </v-card-subtitle>
        <center>
          <v-img :src="i.img" height="400" width="600" align="center"></v-img>
        </center>
        <!--<v-card-text> Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ipsum risus, viverra vel elementum vitae, commodo feugiat massa. Maecenas in dui ultrices nisl fermentum blandit. Phasellus maximus velit ut nisl luctus, sodales dignissim ligula sagittis. Vestibulum nec velit ut diam pharetra dapibus malesuada at risus. Quisque posuere vehicula velit. Maecenas ullamcorper tellus eros, venenatis aliquet leo eleifend a. Fusce cursus lorem at volutpat porttitor. In aliquet eu tellus in imperdiet. Fusce tincidunt urna magna. Proin tempus tellus et arcu convallis rutrum. Fusce non venenatis lorem. Proin libero est, consectetur non diam et, accumsan iaculis augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque consequat mi risus, nec tincidunt ante fringilla vitae. </v-card-text>-->
        <v-card-subtitle> {{ i.content }} </v-card-subtitle>
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