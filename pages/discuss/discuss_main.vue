<template>
  <div>
    <section>
      <v-row>
        <v-btn to="/discuss/add_topic">add Topic</v-btn>
      </v-row>
      <v-row v-for="i in data" :key="i._id">
        <v-card>
          <router-link
            :to="{
              path: '/discuss/discuss_room',
              query: { title: i.title, id: i._id,discuss:i },
            }"
          >
            <v-card-text>{{ i.title }}</v-card-text>
          </router-link>
        </v-card>
      </v-row>
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
      this.$router.push("/login/login");
    },
  },
};
</script>
