<template>
  <div v-if="quest" align="center">
    <v-card width="50%">
      <h1 class="my-5" align="center">Question</h1>
      <v-card-text width="50%"><Editor v-model="question" /> </v-card-text>
      <v-btn width="40%" class="ma-5" @click="toChoice()">next</v-btn>
      <v-btn
        width="40%"
        class="ma-5"
        :to="{ path: '/writer/writer_quiz', query: { id: id } }"
        >back</v-btn
      >
    </v-card>
  </div>
  <div v-else align="center">
    <v-card width="80%">
      <br />
      <div align="center" class="ma-5" v-html="question" />
      correct answer: {{ correct }}
      <v-card-actions>
        <v-row>
          <v-col class="col-6" v-for="i in choice.length" :key="i">
            <v-btn
              class="ma-5"
              @click="(c = choice[i - 1]), (temp_i = i - 1), (button = true)"
              :disabled="button"
            >
              {{ choice[i - 1] }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
      <v-card-text>
        <v-text-field
          :disabled="!corek || !del"
          label="new choice"
          v-model="c"
        />
      </v-card-text>
      <v-row>
        <v-col>
          <v-btn
            class="ma-5"
            :disabled="!corek || !edit || !del"
            @click="choice.push(c), (c = '')"
            >add choice</v-btn
          >
        </v-col>
        <v-col>
          <v-btn
            v-if="corek"
            class="ma-5"
            :disabled="!button || !edit || !del"
            @click="(corek = false), (button = false)"
            >Set correct answer
          </v-btn>
          <v-btn
            v-else
            class="ma-5"
            :disabled="!button"
            @click="(correct = c), (c = ''), (corek = true), (button = true)"
            >save correct answer
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
            v-if="edit"
            class="ma-5"
            :disabled="!button || !corek || !del"
            @click="(edit = false), (button = false)"
          >
            Edit answer
          </v-btn>
          <v-btn
            v-else
            class="ma-5"
            :disabled="!button"
            @click="(choice[temp_i] = c), (correct = ''), (c = ''), (edit = true)"
          >
            apply answer
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
            v-if="del"
            class="ma-5"
            :disabled="!button || !corek || !edit"
            @click="(del = false), (button = false)"
          >
            Delete answer
          </v-btn>
          <v-btn
            v-else
            class="ma-5"
            :disabled="!button"
            @click="
              choice.splice(temp_i, 1), (c = ''), (correct = ''), (del = true)
            "
          >
            apply Deleted</v-btn
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn
            class="ma-5"
            :disabled="!corek || !edit || !del"
            @click="quiz()"
            >save</v-btn
          >
          <v-btn
            class="ma-5"
            :disabled="!corek || !edit || !del"
            @click="quest = true"
            >back</v-btn
          >
          <v-btn
            v-if="!del || !corek || !edit"
            class="ma-5"
            @click="
              (button = true),
                (c = ''),
                (del = true),
                (corek = true),
                (edit = true)
            "
          >
            Cancel
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: this.$auth.user,
      id: this.$route.query.id,
      loggedIn: this.$auth.loggedIn,
      quest: true,
      c: "",
      temp_i: 0,
      choice: this.$route.query.data.choice,
      question: this.$route.query.data.question,
      correct: this.$route.query.data.correct,
      corek: true,
      button: true,
      edit: true,
      del: true,
    };
  },
  methods: {
    toChoice() {
      if (this.question == "") {
        alert("Please fill Question");
      } else {
        this.quest = false;
      }
    },
    async quiz() {
      const payload = {
        data: {
          id: this.id,
          question: this.question,
          choice: this.choice,
          correct: this.correct,
          qid:this.$route.query.data.qid,
        },
      };

        await this.$axios.$post("/editquiz", payload);
        await this.$router.push( `/writer/writer_quiz?id=${this.$route.query.id}` );

      //await alert(payload.subject.id);

      //await this.$axios.$post("/addquiz", payload);
      //await this.$router.push(`/writer/writer_quiz?id=${this.$route.query.id}`);
    },
  },
};
</script>
