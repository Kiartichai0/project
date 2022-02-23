<template>
  <div>
    <v-col>
      <v-card>
        <v-card-text><center><h1>User</h1></center></v-card-text>
        <div>

          <v-row class="col-12 justify-center" v-for="i in users" :key="i._id">
            <v-card >
              <v-card-text>{{ i.username }} <v-btn color="red lighten-2" text @click="deluser(i.username)"> DEL </v-btn>
              </v-card-text>
            </v-card>
          </v-row>
        </div>
      </v-card>
    </v-col>
    <v-col>
      <v-card>
        <v-card-text><center><h1>Subject</h1></center></v-card-text>
        <div>
          <v-row
            class="col-12 justify-center"
            v-for="j in subject"
            :key="j._id"
          >
            <v-card>
              <v-card-text>{{ j.title }} <v-btn color="red lighten-2" text @click="delsub(j.title)"> DEL </v-btn>
              </v-card-text>
            </v-card>
          </v-row>
        </div>
      </v-card>
    </v-col>
  </div>
</template>
<script>
export default {
  middleware: ['logger', 'auth'],
  async asyncData({ $axios }) {
    const users = await $axios.$get("/users");
    const subject = await $axios.$get("/subject");
    return { users, subject };
  },
  data() {
    return {
      user: this.$auth.user,
      loggedIn: this.$auth.loggedIn,
    };
  },
  methods: {
    async deluser(id) {
      await this.$axios.$delete("/users/delete",{data: { id: id }  });
      await location.reload();
    },

    async delsub(id) {
      await this.$axios.$delete("/subject/delete",{data: { id: id }  });
      await location.reload();
    },

    async logout() {
      await this.$auth.logout();
      this.$router.push("/admin/login");
    },
  },
};
</script>