<template>
  <div>
    <v-card>
      <v-form @submit="adddis">
        <br />
        <h2 align="center">Question</h2>
        <v-col width="80%">
          <v-text-field label="Question" align="center" v-model="title" />
        </v-col>
        <h2 align="center">description</h2>
        <br />
        <v-col>
          <Editor v-model="info" />
        </v-col>
        <br />
        <v-col>
          <v-row class="ma-5 justify-center">
            <v-btn class="ma-5" type="submit"> Save </v-btn>
            <v-btn class="ma-5" to="/discuss/discuss_main"> Back </v-btn>
          </v-row>
        </v-col>
      </v-form>
    </v-card>
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
      id: this.$route.query.id,
      title:this.$route.query.title,
      info: this.$route.query.info,
    };
  },
  methods: {
    async adddis(e) {
      e.preventDefault();
      //await console.log(this.role);

      const payload = {
        discuss: {
          id: this.$route.query.id,
          title: this.title,
          description: this.info,
        },
      };
      await this.$axios.$post("/editdiscuss", payload);
      await this.$router.push("/discuss/discuss_main");
    },
  },
};
</script>

