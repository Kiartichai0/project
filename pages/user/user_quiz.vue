<template>
  <div v-if="current < quiz.length" align="center">
    <v-row align="center" class="col-6">
      <v-card width="100%">
        <div class="ma-5" v-html="quiz[current].question" />
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
  </div>
  <div v-else>
    <v-card>
      <v-card-title>your score: {{ score }} of {{ quiz.length }}</v-card-title>
      <v-row class="ml-5" v-for="i in quiz.length" :key="i">
        <v-card-title>question: {{ quiz[i - 1].question }}</v-card-title>
        <v-card-text>Correct answer: {{ quiz[i - 1].correct }}</v-card-text>
        <v-card-text>Your answer: {{ selection[i - 1] }}</v-card-text>
      </v-row>
      <v-btn
        class="ma-5"
        @click="back()"
      >
        back
      </v-btn>
    </v-card>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, query }) {
    const q = await $axios.$get(`/quiz/${query.id}`);
    const quiz = q[0].quiz;
    return { quiz };
  },
  data() {
    return {
      user: this.$auth.user,
      loggedIn: this.$auth.loggedIn,
      id: this.$route.query.id,
      score: 0,
      selection: [],
      current: 0,

      //entries: Object.entries(quiz),
    };
  },
  methods: {

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
    async back() {
      const payload = {
        data: {
          id: this.$route.query.id,
          score: this.score,
        },
      };

      await this.$axios.$post("/score", payload);
      await this.$router.push(`/user/user_topic?id=${this.id}`);
    },
  },
};
</script>