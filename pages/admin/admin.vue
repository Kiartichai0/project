<template>
  <div v-if="user.role == 'admin' && loggedIn ">
    <v-col>
      <p align="right">
        Hello, {{ user.username }}
        <v-btn class="ma-5" @click="logout">Logout</v-btn>
      </p>

      <v-card width="100%" align="center">
        <v-card-text><h1>User</h1></v-card-text>
        <div>
          <v-row class="col-12 justify-center" v-for="i in users" :key="i._id">
            <v-card width="80%">
              <v-card-text
                >{{ i.username }}
                <v-btn color="red lighten-2" text @click="deluser(i.username)">
                  DEL
                </v-btn>
              </v-card-text>
            </v-card>
          </v-row>
        </div>
      </v-card>
    </v-col>
    <v-col>
      <v-card width="100%" align="center">
        <v-card-text><h1>Subject</h1></v-card-text>
        <div>
          <v-row
            class="col-12 justify-center"
            v-for="j in subject"
            :key="j._id"
          >
            <v-card width="80%">
              <v-card-text><nuxt-link :to="{
                  path: '/writer/writer_topic',
                  query: { id: j.id },
                }">{{ j.title }} </nuxt-link> {{ j.id
                }}<v-btn color="red lighten-2" text @click="delsub(j.title)">
                  DEL
                </v-btn>
              </v-card-text>
            </v-card>
          </v-row>
        </div>
      </v-card>
    </v-col>
  </div>
  <div v-else>
    <div align="center"> 
      <br/>  
      <br/>
      <br/>
      <br/>
      <br/>
      <h1 >Administrator only!!!</h1>
      <v-btn class="my-5" to="/admin/login">Login</v-btn>
    
    </div>
 
  </div>
</template>
<script>
export default {
  async asyncData({ $axios }) {
    const users = await $axios.$get("/users");
    const u = await $axios.$get("/me");
    const user = u.data.user;
    const subject = await $axios.$get("/subject");
    return { user, users, subject };
  },
  data() {
    return {
      loggedIn: this.$auth.loggedIn,
    };
  },
  methods: {
    async deluser(id) {
      await this.$axios.$delete("/users/delete", { data: { id: id } });
      await location.reload();
    },

    async delsub(id) {
      await this.$axios.$delete("/subject/delete", { data: { id: id } });
      await location.reload();
    },

    async logout() {
      await this.$auth.logout();
      this.$router.push("/admin/login");
    },
  },
};
</script>