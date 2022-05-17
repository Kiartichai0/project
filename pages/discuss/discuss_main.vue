<template>
  <div>
      <p v-if="loggedIn" align="right">
        User: {{ user.username }}
        <v-btn class="ma-5" @click="logout">Logout</v-btn>
      </p>
       <p v-else align="right">
        <v-btn class="ma-5" to="/login/login">Login</v-btn>
      </p>
    <section>
      <v-col align="center">
        <v-btn width="80%" v-if="loggedIn" to="/discuss/add_topic">add Topic</v-btn>
      </v-col>
      <v-col v-for="i in data" :key="i._id">
        <v-card >
          <router-link
            :to="{
              path: '/discuss/discuss_room',
              query: {  id: i.id },
            }"
          >
            <v-card-text>{{ i.title }}</v-card-text>
          </router-link>
        </v-card>
      </v-col>
    </section>
  </div>
</template>
<script>
export default {
  async asyncData({ $axios }) {
    const data = await $axios.$get("/discuss");
    return { data };
  },
  data() {
    return {
      user: this.$auth.user,
      loggedIn: this.$auth.loggedIn,
    };
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      await this.$nuxt.refresh();
      //this.$router.push("/login/login");
    },
  },
};
</script>
