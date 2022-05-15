<template>
  <div v-if="user.role === 'User'">
    <h1>Only Writer</h1>
    <v-btn to="/user/user_main">back</v-btn>
  </div>
  <div v-else>
    <v-row>
      <h1>
        Hello,{{ user.username }}
        <v-btn class="button--grey" @click="logout">Logout</v-btn>
      </h1>
    </v-row>
    <v-row>
      <v-col class="col-4" v-for="i in subject" :key="i._id">
        <v-card>
          <nuxt-link
            :to="{
              path: '/writer/writer_topic',
              query: { id: i.id },
            }"
          >
            <v-card-text> {{ i.title }} </v-card-text>
          </nuxt-link>
        </v-card>
      </v-col>
      <v-col class="col-4">
        <v-card>
          <router-link to="/writer/add_subject">
            <v-card-text>
              <v-icon> mdi-plus-thick </v-icon> add subject
            </v-card-text>
          </router-link>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  middleware: ["logger", "auth"],
  async asyncData({ $axios }) {
    const subject = await $axios.$get("/subject");
    return { subject };
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