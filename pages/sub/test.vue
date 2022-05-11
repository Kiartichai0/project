<template>
  <div v-if="current < quiz.length" align="center">
    <p>score: {{ score }}</p>
    <p>{{ quiz.length }}</p>
    <p>{{ quiz[current].correct }}</p>
    <p>{{ selection }}</p>
    <v-row align="center" class="col-6">
      <v-card>
        <v-card-title> Question # {{ quiz[current].question }} </v-card-title>
        <v-card-text> questions is What???????? </v-card-text>
        <v-card-actions>
          <v-row align="center">
            <v-col class="col-6" v-for="i in quiz[current].choice" :key="i">
              <v-btn class="ma-5" @click="answer(i, quiz[current].correct)">
                {{ i }}
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-row>
    <v-btn class="ma-5 primary" to="/user/user_result"> submit </v-btn>
    <v-btn class="ma-5" to="/user/user_main"> back </v-btn>
  </div>
  <div v-else>
    <v-card>
      <v-card-title>your score: {{ score }} of {{ quiz.length }}</v-card-title>
      <v-row class="ml-5" v-for="i in quiz.length" :key="i">
        <v-card-title>question: {{ quiz[i-1].question }}</v-card-title>
        <v-card-text>Correct answer: {{ quiz[i-1].correct }}</v-card-text>
        <v-card-text>Your answer: {{ selection[i-1] }}</v-card-text>
      </v-row>

    </v-card>
  </div>
</template>

<script>
export default {
  created() {
    console.log("hello world");
  },
  async asyncData({ $axios }) {
    const data = await $axios.$get("/quiz");
    const quiz = data[3].quiz;
    return { quiz };
  },
  data() {
    return {
      user: this.$auth.user,
      loggedIn: this.$auth.loggedIn,
      score: 0,
      selection: [],
      current: 0,
      //entries: Object.entries(quiz),
    };
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$router.push("/login/login");
    },
    answer(a, b) {
      if (a == b) {
        this.score++;
        //alert("Correct");
      } else {
        //alert("Wrong");
      }
      this.selection.push(a);
      this.current++;
      console.log(a, b);
    },
  },
};
</script>