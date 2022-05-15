<template>
  <div >
    <v-card >
      <v-card-title class="justify-center ma-5"> ADD Subject </v-card-title>
        <v-form class="col-10" @submit="addsubject">
          <v-text-field class="ma-5" label="Subject name" v-model="title" />
          <v-btn class=" ma-5" type="submit"> Save </v-btn>
          <v-btn class=" ma-5" to="/writer/writer_main"> Back </v-btn>
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
    };
  },
  methods: {
    async addsubject(e) {
      e.preventDefault();
      //await console.log(this.role);

      const payload = {
        subject: {
          id:(Math.random() + 1).toString(36).substring(2),
          title: this.title,
        },
      };

      await this.$axios.$post("/addsubject", payload);
      await this.$router.push("/writer/writer_main");
    },
  },
};
</script>

