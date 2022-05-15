<template>
  <div v-if="next" align="center">
    <v-card width="50%">
      <h1 class="my-5" align="center">Question</h1>
      <v-card-text width="50%"><Editor v-model="question" />
        </v-card-text>
        <v-btn width="50%" class="ma-5" @click="next = false">next</v-btn>
    </v-card>
  </div>
  <div v-else align="center">
      <v-card width="50%">
          <br/>
        <div align="center" class="ma-5" v-html="question" />
        <v-card-actions>
          <v-row align="center">
            <v-col class="col-6" v-for="i in choice" :key="i">
              <v-btn class="ma-5" disabled>
                {{ i }}
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
        <v-card-text width="50%"><Editor v-model="c" /></v-card-text>
        <v-btn width="25%" class="ma-5" @click="next = false">next</v-btn>
      </v-card>
  </div>
  <!--div>
        <v-card>
            <v-card-title class="justify-center ma-5"> ADD Subject </v-card-title>
            <center>
            <v-form class="col-10">
               <v-textarea label="question" />
                <v-text-field label="choice 1" />
                <v-text-field label="choice 2" />
                <v-text-field label="choice 3" />
                <v-text-field label="choice 4" />
                <v-btn to="/writer/writer_topic" > Save </v-btn>
                <v-btn to="/writer/writer_topic"> Back </v-btn>         
            </v-form>
            </center>
        </v-card>
    </div-->
</template>

<script>
export default {
  data() {
    return {
      user: this.$auth.user,
      id: this.$route.query.id,
      loggedIn: this.$auth.loggedIn,
      next: true,
      c: "",
      choice: [],
      question: "",
    };
  },
  methods: {
    async addtopic(e) {
      e.preventDefault();
      //await console.log(this.role);

      const payload = {
        data: {
          id: this.id,
          topid: this.$route.query.topid,
          title: this.title,
          description: this.description,
          content: this.content,
        },
      };

      //await alert(payload.subject.id);

      await this.$axios.$post("/edittopic", payload);
      await this.$router.push(
        `/writer/writer_topic?id=${this.$route.query.id}`
      );
    },
  },
};
</script>
