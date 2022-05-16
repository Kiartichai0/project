<template>
  <div align="center">
    <v-col v-for="x in quiz.length" :key="x">
        <v-card width="50%">
          <v-card-text><div class="my-5" v-html="quiz[x - 1].question" /> <br/> <h4> correct answer: {{quiz[x - 1].correct}}</h4> </v-card-text>
          
          <v-card-actions>
            <v-row>
              <v-col class="col-6" v-for="i in quiz[x-1].choice" :key="i">
                <v-btn
                  disabled
                  class="ma-5"
                  @click="answer(i, quiz[x-1].correct)"
                >
                  {{ i }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
          <v-btn class="ma-4" width="30%" :to="{ path: '/writer/edit_quiz', query: { id: id, data:quiz[x-1] ,edit:true }}"> Edit </v-btn>
          <v-btn class="ma-4" width="30%" @click=" delQuiz(quiz[x-1]) "> Delete </v-btn>
        </v-card>
    </v-col>
    <v-btn class="ma-5" :to="{ path: '/writer/add_quiz', query: { id: id } }" > add new question </v-btn>
    <v-btn class="ma-5" :to="{ path: '/writer/writer_topic', query: { id: id } }" > back </v-btn>
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

      //entries: Object.entries(quiz),
    };
  },
  methods: {
    async delQuiz(quiz){
      const payload = {
        data: {
          id:this.$route.query.id,
          quiz: quiz,
        },
      };
      await this.$axios.$post("/delquiz", payload);
      await this.$nuxt.refresh();
    },
  },
};
</script>