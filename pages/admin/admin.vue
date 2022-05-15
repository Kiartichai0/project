<template>

  <div v-if="user.role == 'admin' ">
    <v-col>
      <v-card width="100%">
        <v-card-text><center><h1>User</h1></center></v-card-text>
        <div>
          <v-row class="col-12 justify-center" v-for="i in users" :key="i._id">
            <v-card width="80%">
              <v-card-text>{{ i.username }} <v-btn color="red lighten-2" text @click="deluser(i.username)"> DEL </v-btn>
              </v-card-text>
            </v-card>
          </v-row>
        </div>
      </v-card>
    </v-col>
    <v-col>
      <v-card width="100%">
        <v-card-text><center><h1>Subject</h1></center></v-card-text>
        <div>
          <v-row
            class="col-12 justify-center"
            v-for="j in subject"
            :key="j._id"
          >
            <v-card width="80%">
              <v-card-text>{{ j.title }} <v-btn color="red lighten-2" text @click="delsub(j.title)"> DEL </v-btn>
              </v-card-text>
            </v-card>
          </v-row>
        </div>
      </v-card>
    </v-col>
  </div>
  <div v-else>
  <h1>Administrator only!!!</h1>
  <v-btn to="/admin/login">Login</v-btn>
  </div>
</template>
<script>
export default {
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