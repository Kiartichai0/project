<template>
    <div>
        <v-row>
            <v-col class="col-4" v-for="i in subject" :key="i._id">
                <v-card>
                    <router-link to="/writer/writer_topic">
                        <v-card-text> {{i.title}} </v-card-text>
                    </router-link>
                </v-card>
            </v-col>
            <v-col class="col-4">
                <v-card>
                    <router-link to="/writer/add_subject">
                        <v-card-text> <v-icon > mdi-plus-thick </v-icon> add subject </v-card-text>
                    </router-link>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    async asyncData({ $axios }) {
      const subject = await $axios.$get('/subject');
      return { subject };
    },
  data() {
    return {
      user: this.$auth.user,
      loggedIn: this.$auth.loggedIn
    };
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$router.push('/login/login');
    }
  }
};
</script>