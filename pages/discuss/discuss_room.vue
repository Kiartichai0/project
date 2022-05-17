<template>
  <div>
    <p v-if="loggedIn" align="right">
      User: {{ user.username }}
      <v-btn class="ma-5" @click="logout">Logout</v-btn>
    </p>
    <v-col>
      <v-card>
        <v-col>
          <p v-if="loggedIn" align="right"><v-btn v-if="user.username == dis[0].user.username">x</v-btn> </p>
            <h1>{{ dis[0].title }}</h1>
            <h4>user: {{ dis[0].user.username }}</h4>
            <div v-html="dis[0].description" />
        </v-col>
        <v-col v-for="i in dis[0].comments.length" :key="i">
          <v-card>
            <p v-if="loggedIn" align="right">
              <v-btn  class="ma-1" v-if="user.username == dis[0].comments[i - 1].user" :disabled="!edit"  @click=" (edit = !edit), (temp_c = dis[0].comments[i - 1].cid),  (info = dis[0].comments[i - 1].comment) ">
                edit 
              </v-btn>
              <v-btn class="ma-1"   v-if="user.username == dis[0].comments[i - 1].user"  @click="delcomment(dis[0].comments[i - 1])">
                x
              </v-btn>
            </p>
            <v-card-text>
              <div v-html="dis[0].comments[i - 1].comment" />
              <p align="right">user:{{ dis[0].comments[i - 1].user }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-card>
    </v-col>
    <v-col>
      <Editor v-model="info" />
      <br />
      <v-btn v-if="loggedIn && edit" @click="addcomment(), (info = '')">Save</v-btn>
      <v-btn v-else-if="loggedIn && !edit" @click="editcomment(), (edit = !edit), (info = '')" >Save </v-btn>
      <v-btn v-else to="../login/login"> Save </v-btn>
      <v-btn to="/discuss/discuss_main"> Back </v-btn>
    </v-col>
  </div>
</template>
<script>
export default {
  async asyncData({ $axios, query }) {
    const dis = await $axios.$get(`/discuss/${query.id}`);
    return { dis };
  },

  data() {
    return {
      user: this.$auth.user,
      loggedIn: this.$auth.loggedIn,
      id: this.$route.query.id,
      info: "",
      temp_c: null,
      edit: true,
      edit_t: true,
    };
  },
  methods: {
    async addcomment() {
      const payload = {
        data: {
          id: this.id,
          comment: this.info,
          user: this.user.username,
        },
      };
      await this.$axios.$post("/addcomments", payload);
      await this.$nuxt.refresh();
    },
    async editcomment() {
      const payload = {
        data: {
          id: this.id,
          comment: this.info,
          cid: this.temp_c,
        },
      };

      await this.$axios.$post("/editcomments", payload);
      await this.$nuxt.refresh();
    },

    async delcomment(x) {
      const payload = {
        data: {
          id: this.id,
          comment: x,
        },
      };

      await this.$axios.$post("/delcomments", payload);
      await this.$nuxt.refresh();
    },
    async logout() {
      await this.$auth.logout();
      this.$router.push("/discuss/discuss_main");
    },
  },
};
</script>