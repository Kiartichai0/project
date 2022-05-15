<template>
  <div align="center">
    <h1>{{ quiz }}</h1>
    <v-col v-for="x in quiz.length" :key="x">
    
        <v-card width="50%">
          <div class="my-5" v-html="quiz[x - 1].question" />
          <v-card-actions>
            <v-row>
              <v-col class="col-6" v-for="i in quiz[current].choice" :key="i">
                <v-btn
                  disabled
                  class="ma-5"
                  @click="answer(i, quiz[current].correct)"
                >
                  {{ i }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
          <v-btn class="ma-4" width="30%"> Edit </v-btn>
          <v-btn class="ma-4" width="30%"> Delete </v-btn>
        </v-card>
    </v-col>
    <v-btn class="ma-5 primary"> save </v-btn>
    <v-btn class="ma-5 success" to="/writer/add_quiz"> add new question </v-btn>
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
      current: 0,

      //entries: Object.entries(quiz),
    };
  },
  methods: {},
};
</script>