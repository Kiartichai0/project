<template>
  <div>
    <v-card>
      <v-form @submit="adddis">
      <br/>
        <h2 align="center"> คำถาม </h2>
          <v-col>
            <v-text-field label="คำถาม" align="center" v-model="title" />
          </v-col>
          <h2 align="center"> คำอธิบาย </h2>
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
      title: "",
      info: "",
    };
  },
  methods: {
    async adddis(e) {
      e.preventDefault();
      //await console.log(this.role);

      const payload = {
        discuss: {
          id:(Math.random() + 1).toString(36).substring(2),
          title: this.title,
          description: this.info,
          comments: [],
          user:this.$auth.user,
        },
      };
      await this.$axios.$post("/addtopdiscuss", payload);
      await this.$router.push("/discuss/discuss_main");
    },
  },
};
</script>

