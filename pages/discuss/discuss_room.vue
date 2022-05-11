<template>
  <div>
    <h1>{{ title }}</h1>
    <div v-html="discuss.description"></div>
    <!--p>{{ discuss }}</p-->
    <v-card> <div v-html="info"></div> </v-card>
    <v-card class="mx-auto"  outlined>
      <v-list-item three-line>
        <v-list-item-content>

          <v-list-item-subtitle
            >{{info}}</v-list-item-subtitle
          >
        </v-list-item-content>

      </v-list-item>

    </v-card>
    <v-form class="col-10" @submit="adddis">
      <Editor v-model="info" />
      <br />
      <v-btn type="submit"> Save </v-btn>
      <v-btn to="/writer/writer_main"> Back </v-btn>
    </v-form>
  </div>
</template>
<script>
import Editor from "../../components/Editor";
export default {
  components: {
    Editor,
  },

  data() {
    return {
      user: this.$auth.user,
      loggedIn: this.$auth.loggedIn,
      title: this.$route.query.title,
      id: this.$route.query.id,
      discuss: this.$route.query.discuss,
      info: "",
    };
  },
   methods: {
    async adddis(e) {
      e.preventDefault();
      //await console.log(this.role);

      const payload = {
        id:this.id,
        comment:this.info,
        allcomment:this.info
      };
      await this.$axios.$post("/addcomments", payload);
      //await this.$router.push("/writer/writer_main");
    },
  },
};
</script>