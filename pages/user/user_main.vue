<template>
  <div v-if="loggedIn">
    <v-row>
      <h1>
        Hello,{{ user.username }}
        <v-btn class="button--grey" @click="logout">Logout</v-btn>
      </h1>
    </v-row>
    <v-row>
      <v-col class="col-4" v-for="i in subject" :key="i._id">
        <v-card>
          <!--router-link to="/user/user_topic"-->
          <router-link
            :to="{
              path: '/user/user_topic',
              query: { id: i.id },
            }"
          >
            <v-card-text>{{ i.title }} </v-card-text>
          </router-link>
        </v-card>
      </v-col>
    </v-row>
  </div>
  <div v-else>
    <v-row>
      <v-btn class="ma-5"
        ><nuxt-link to="/login/login" class="button--grey"
          >Login</nuxt-link
        ></v-btn
      >
    </v-row>
    <v-row>
      <v-col class="col-4" v-for="i in subject" :key="i._id">
        <v-card>
          <router-link to="/login/login">
            <v-card-text> {{ i.title }} </v-card-text>
          </router-link>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
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