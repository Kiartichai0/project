<template>
  <div v-if="loggedIn && user.role == 'admin'   ">
    <v-col>
      <p align="right">
        User: {{ user.username }}
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
              <v-card-text><nuxt-link :to="{ path: '/writer/writer_topic', query: { id: j.id },}">{{ j.title }} </nuxt-link> 
                <v-btn color="red lighten-2" text @click="delsub(j.id)"> DEL </v-btn>
              </v-card-text>
            </v-card>
          </v-row>
        </div>
      </v-card>
    </v-col>
    <v-col>
      <v-card width="100%" align="center">
        <v-card-text><h1>Discussion</h1></v-card-text>
        <div>
          <v-row
            class="col-12 justify-center"
            v-for="k in discus"
            :key="k._id"
          >
            <v-card width="80%">
              <v-card-text><nuxt-link :to="{ path: '/discuss/discuss_room', query: { id: k.id },}">{{ k.title }} </nuxt-link> 
                <v-btn color="red lighten-2" text @click="deldis(k.id)"> DEL </v-btn>
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
    const subject = await $axios.$get("/subject");
    const discus = await $axios.$get("/discuss");
    return {  users, subject, discus };
  },
  data() {
    return {
      user:this.$auth.user,
      loggedIn: this.$auth.loggedIn,
    };
  },
  methods: {
    async deluser(id) {
      await this.$axios.$delete("/users/delete", { data: { id: id } });
      await this.$nuxt.refresh();
    },

    async delsub(id) {
      await this.$axios.$delete("/subject/delete", { data: { id: id } });
      await this.$nuxt.refresh();
    },
    
    async deldis(id) {
      await this.$axios.$delete("/discuss/delete", { data: { id: id } });
      await this.$nuxt.refresh();
    },

    async logout() {
      await this.$auth.logout();
      this.$router.push("/admin/login");
    },
  },
};
</script>