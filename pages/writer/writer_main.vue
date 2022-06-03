<template>
  <div v-if="!loggedIn || user.role == 'User'   ">
    <div align="center">
      <br />
      <br />
      <br />
      <br />
      <br />
      <h1>สำหรับผู้เขียนเนื้อหาเท่านั้น!!!</h1>
      <nuxt-link to="/user/user_main"> กลับไปหน้าแรก </nuxt-link>
    </div>
  </div>
  <div v-else>
    <v-row class="my-5">
      <v-col class="col-3" v-for="i in subject" :key="i._id">
        
          <v-card min-height="100%" >
            <div align="right">
              <v-btn color="red lighten-2" text @click="del_subject = i.id , del_dialog = true"> 
                x 
              </v-btn>
            </div>
            <v-card flat :to="{  path: '/writer/writer_topic',  query: { id: i.id },  }">
            <div align="center">
                  <v-avatar color="primary" size="128"> 
                    <img v-if="i.pic" :src="i.pic" alt="avatar"/>
                    <span v-else class="white--text text-h1"> {{i.title[0]}} </span>
                  </v-avatar>
                  <h1> {{ i.title }} </h1>
            </div>
            </v-card>
          </v-card>
      </v-col>
      <v-col class="col-3">
        <div align="center">
        
          <v-card to="/writer/add_subject"  >
            <br/>
            <v-card-text>
            <v-avatar size="128"> 
              <v-icon size="100"> mdi-plus-thick </v-icon>
            </v-avatar>
            </v-card-text>
            <h1> เพิ่มวิชา </h1>
          </v-card>
        </div>

      </v-col>
    </v-row>
      <!--dialog ลบsubject-->
      <v-dialog v-model="del_dialog " max-width="400">
        <v-spacer></v-spacer>
          <v-card>
            <v-card-text></v-card-text>
            <v-card-text><h2 align="center"> ตุณต้องการลบวิชานี้ ? </h2></v-card-text>
            
            <v-card-actions >
              <div align="center">              
                <v-btn text color="red" class="ma-5" @click="delsubject(del_subject), del_dialog = false"> ตกลง </v-btn>
                <v-btn text class="ma-5" @click="del_dialog = false"> ยกเลิก </v-btn>
              </div>
            </v-card-actions>
          </v-card>
      </v-dialog>

  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const subject = await $axios.$get("/subject");
    return { subject };
  },
  data() {
    return {
      user: this.$auth.user,
      loggedIn: this.$auth.loggedIn,
      del_subject:'',
      del_dialog:false,
    };
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$router.push("/login/login");
    },
    async delsubject(id) {
      await this.$axios.$delete("/subject/delete", { data: { id: id } });
      await this.$nuxt.refresh();
    },
  },
};
</script>