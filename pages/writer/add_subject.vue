<template>
  <div align="center" >
    <v-card width="50%">
      <v-card-title class="justify-center ma-5"> เพิ่มวิชา </v-card-title>
        <v-form @submit="addsubject">
            <div v-if="pic != '' " align="center">
                <v-avatar size="100"> 
                  <img :src="pic"/>
                </v-avatar>
            </div>
          <v-text-field class="ma-5" label="ชื่อวิชา" v-model="title" />
          <v-text-field class="ma-5" label="รูปปก" v-model="pic" />
          <v-btn class=" ma-5" type="submit"> บันทึก </v-btn>
          <v-btn class=" ma-5" to="/writer/writer_main"> กลับ </v-btn>
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
      try{      
        await this.$axios.$post("/addsubject", payload);
        await this.$router.push(`/writer/add_topic/?id=${payload.subject.id}`);}
      catch(e){
        console.log(e);
      }
    },
  },
};
</script>

