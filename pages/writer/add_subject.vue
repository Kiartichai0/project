<template>
  <div align="center" >
    <v-card width="50%">
      <v-card-title class="justify-center ma-5"> ADD Subject </v-card-title>
        <v-form @submit="addsubject">
            <div v-if="pic != '' " align="center">
                <v-avatar size="100"> 
                  <img :src="pic"/>
                </v-avatar>
            </div>
          <v-text-field class="ma-5" label="Subject name" v-model="title" />
          <v-text-field class="ma-5" label="thumbnail link" v-model="pic" />
          <v-btn class=" ma-5" type="submit"> Save </v-btn>
          <v-btn class=" ma-5" to="/writer/writer_main"> Back </v-btn>
        </v-form>
    </v-card>
  </div>
</template>

<script>

export default {
  data() {
    return {
      title: "",
      pic: "",
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
          pic: this.pic,
          score:[],
        },
      };

      await this.$axios.$post("/addsubject", payload);
      await this.$router.push("/writer/writer_main");
    },
  },
};
</script>

