<template>
  <div v-if="user.role === 'User'">
    <div align="center">
      <br />
      <br />
      <br />
      <br />
      <br />
      <h1>สำหรับผู้เขียนเนื้อหาเท่านั้น!!!</h1>
      <nuxt-link to="/user/user_main"> กลับ </nuxt-link>
    </div>
  </div>
  <div v-else>
    <p align="right">
      User: {{ user.username}} <Profile/>
    </p>
    <v-row class="my-5">
      <v-col class="col-4" v-for="i in subject" :key="i._id">
        <nuxt-link  :to="{  path: '/writer/writer_topic',  query: { id: i.id },  }"  > 
          <v-card>
            <div align="right">
              <v-btn color="red lighten-2" text @click="delsubject(i.id)"> 
                x 
              </v-btn>
            </div>
            <div align="center">
                  <v-avatar color="primary" size="128"> 
                    <img v-if="i.pic" :src="i.pic" alt="avatar"/>
                    <span v-else class="white--text text-h1"> {{i.title[0]}} </span>
                  </v-avatar>
                  <h1> {{ i.title }} </h1>
            </div>
          </v-card>
        </nuxt-link>
      </v-col>
      <v-col>
        <div align="center">
        <nuxt-link  to="/writer/add_subject" > 
          <v-card>
            <v-card-text>
            <v-avatar color="primary" size="128"> 
              <v-icon> mdi-plus-thick </v-icon>
            </v-avatar>
            </v-card-text>
            <h1> เพิ่มวิชา </h1>
          </v-card>
        </nuxt-link>
        </div>

      </v-col>
    </v-row>
      <v-col align="center" >
        
      </v-col>
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
    async delsubject(id) {
      await this.$axios.$delete("/subject/delete", { data: { id: id } });
      await location.reload();
    },
  },
};
</script>