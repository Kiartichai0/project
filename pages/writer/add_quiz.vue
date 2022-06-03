<template>
  <div v-if="quest" align="center">
  
    <v-card  width="50%">
      <h1 class="my-5" align="center">คำถาม</h1>
      <v-card-text width="50%"><Editor v-model="question" /> </v-card-text>
      <v-btn width="40%" class="ma-5" @click="toChoice()">ต่อไป</v-btn>
      <v-btn
        width="40%"
        class="ma-5"
        :to="{ path: '/writer/writer_quiz', query: { id: id } }"
        >กลับ</v-btn
      >
    </v-card>
  </div>
  <div v-else align="center">
    <v-card width="80%">
      <br />
      <div align="center" class="ma-5" v-html="question" />
      เฉลย: {{ correct }}
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
            >เพิ่มตัวเลือก</v-btn
          >
        </v-col>
        <v-col>
          <v-btn
            v-if="corek"
            class="ma-5"
            :disabled="!button || !edit || !del"
            @click="(corek = false), (button = false)"
            >เลือกเฉลย
          </v-btn>
          <v-btn
            v-else
            class="ma-5"
            :disabled="!button"
            @click="(correct = c), (c = ''), (corek = true), (button = true)"
            >บันทึกเฉลย
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
            v-if="edit"
            class="ma-5"
            :disabled="!button || !corek || !del"
            @click="(edit = false), (button = false)"
          >
            แก้ไขตัวเลือก
          </v-btn>
          <v-btn
            v-else
            class="ma-5"
            :disabled="!button"
            @click="(choice[temp_i] = c), (c = ''),(correct = ''), (edit = true)"
          >
            ยืนยันการแก้ไข
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
            v-if="del"
            class="ma-5"
            :disabled="!button || !corek || !edit"
            @click="(del = false), (button = false)"
          >
            ลบตัวเลือก
          </v-btn>
          <v-btn
            v-else
            class="ma-5"
            :disabled="!button"
            @click="
              choice.splice(temp_i, 1), (c = ''), (correct = ''), (del = true)
            "
          >
            ยืนยันการลบ</v-btn
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn
            class="ma-5"
            :disabled="!corek || !edit || !del"
            @click="addquiz()"
            >บันทึก</v-btn
          >
          <v-btn
            class="ma-5"
            :disabled="!corek || !edit || !del"
            @click="quest = true"
            >กลับ</v-btn
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
            ยกเลิก
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
      choice: [],
      question: "",
      correct: "",
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
    back() {
      if (this.choice.length != 0) {
        this.c = this.choice.pop();
      } else {
        this.next = true;
      }
    },
    async addquiz() {
      const payload = {
        data: {
          id: this.id,
          question: this.question,
          choice: this.choice,
          correct: this.correct,
        },
      };
      if (this.correct == "") {
        alert("Please select correct answer");
      } else {
        await this.$axios.$post("/addquiz", payload);
        await this.$router.push(
          `/writer/writer_quiz?id=${this.$route.query.id}`
        );
      }

      //await alert(payload.subject.id);

      //await this.$axios.$post("/addquiz", payload);
      //await this.$router.push(`/writer/writer_quiz?id=${this.$route.query.id}`);
    },
  },
};
</script>
