<template>
  <div v-if="loggedIn && user.role == 'admin'   ">
  <p align="right">
    ผู้ใช้: {{ user.username }} <Profile/>
  </p>
  <v-card>
    <v-tabs dark background-color="primary" v-model="tab"  grow  >
      <v-tab>
        ผู้ใช้งาน(user)
      </v-tab>
      <v-tab>
        วิชา(subject)
      </v-tab>
      <v-tab>
        กระทู้สนทนา(Discussion)
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
      <v-col align="center">
        <v-row class="col-8">
          <v-text-field prepend-inner-icon="mdi-magnify" v-model="search" />
        </v-row>
        <v-row class="col-8">
          <p>username</p>
          <v-spacer></v-spacer>
          <p>ชื่อ-นามสกุล</p>
          <v-spacer></v-spacer>
        </v-row>
        <v-row class="col-8 " v-for="i in users.filter(x => x.username.toLowerCase().includes(search))" :key="i._id">

              <nuxt-link :to="{ path: '/user/user_profile', query: { id: i.id },}">{{ i.username }} </nuxt-link> 
              <v-spacer></v-spacer>
              <nuxt-link :to="{ path: '/user/user_profile', query: { id: i.id },}"> {{ i.firstname }}  {{ i.lastname }} </nuxt-link> 
              <v-spacer></v-spacer>
              
              <!--v-btn color="red lighten-2" text @click="deluser(i.username)">  ลบ </v-btn-->
            <v-menu  left  bottom  >
            <template v-slot:activator="{ on, attrs }">
              <v-btn  icon  v-bind="attrs"  v-on="on"  >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item >
                <v-btn text color="red lighten-2" @click.stop="dialog_a = true,temp=i.username,temp_id=i.username"> ลบ </v-btn>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-row>
    </v-col>
    </v-tab-item>
    <v-tab-item>
      <v-col align="center">
          <v-row class="col-8">
            <v-text-field prepend-inner-icon="mdi-magnify" v-model="search" />
          </v-row>
          <v-row  class="col-8"  v-for="j in subject.filter(x => x.title.toLowerCase().includes(search))"  :key="j._id"  >

              <nuxt-link :to="{ path: '/writer/writer_topic', query: { id: j.id },}">{{ j.title }} </nuxt-link> 
              
              <v-spacer></v-spacer>

              <!--v-btn color="red lighten-2" text @click="delsub(j.id)"> ลบ </v-btn-->
            
            <v-menu  left  bottom  >
            <template v-slot:activator="{ on, attrs }">
              <v-btn  icon  v-bind="attrs"  v-on="on"  >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item >
                <v-btn color="red lighten-2" text @click.stop="dialog_b = true,temp=j.title,temp_id=j.id"> ลบ </v-btn>
              </v-list-item>
            </v-list>
          </v-menu>
              
          </v-row>
    </v-col>
    </v-tab-item>
    <v-tab-item>
    <v-col align="center">
      <v-row class="col-8">
        <v-text-field prepend-inner-icon="mdi-magnify" v-model="search" />
      </v-row>
      <v-row class="col-8 justify-center"  v-for="k in discus.filter(x => x.title.toLowerCase().includes(search))"  :key="k._id"  >
          <nuxt-link :to="{ path: '/discuss/discuss_room', query: { id: k.id },}">{{ k.title }} </nuxt-link> 

          <v-spacer></v-spacer>

          <!--v-btn color="red lighten-2" text @click="deldis(k.id)"> ลบ </v-btn-->
          <v-menu  left  bottom  >
            <template v-slot:activator="{ on, attrs }">
              <v-btn  icon  v-bind="attrs"  v-on="on"  >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item >
                <v-btn color="red lighten-2" text @click.stop="dialog_c = true,temp=k.title,temp_id=k.id"> ลบ </v-btn>
              </v-list-item>
            </v-list>
          </v-menu>
      </v-row>
      </v-col>
    </v-tab-item>
    
    </v-tabs-items>
  </v-card>
  <!--dialog แจ้งเตือนลบข้อมูล-->
    <v-dialog  v-model="dialog" max-width="400">
    <v-card>
      <v-card-title class="text-h5">
        คุณต้องการลบ {{temp}} ?
      </v-card-title>
      <v-card-actions>
        <v-btn  color="red darken-1"  text  @click="click(temp)"  >  ตกลง  </v-btn>
        <v-btn  color="darken-1"  text  @click="dialog = false">  ยกเลิก  </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
<!--ลบ user-->
  <v-dialog  v-model="dialog_a" max-width="400">
    <v-card>
      <v-card-title class="text-h5">
       คุณต้องการลบ {{temp}} ?
      </v-card-title>
      <v-card-actions>
        <v-btn  color="red darken-1"  text  @click="deluser(temp_id),dialog_a = false"  >  ตกลง  </v-btn>
        <v-btn  color="darken-1"  text  @click="dialog_a = false">  ยกเลิก  </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
<!--ลบ subject-->
  <v-dialog  v-model="dialog_b" max-width="400">
    <v-card>
      <v-card-title class="text-h5">
       คุณต้องการลบ {{temp}} ?
      </v-card-title>
      <v-card-actions>
        <v-btn  color="red darken-1"  text  @click="delsub(temp_id),dialog_b = false"  >  ตกลง  </v-btn>
        <v-btn  color="darken-1"  text  @click="dialog_b = false">  ยกเลิก  </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
<!--ลบ discussion-->
  <v-dialog  v-model="dialog_c" max-width="400">
    <v-card>
      <v-card-title class="text-h5">
       คุณต้องการลบ {{temp}} ?
      </v-card-title>
      <v-card-actions>
        <v-btn  color="red darken-1"  text  @click="deldis(temp_id),dialog_c = false"  >  ตกลง  </v-btn>
        <v-btn  color="darken-1"  text  @click="dialog_c = false">  ยกเลิก  </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!--dialog แจ้งเตือนลบข้อมูล-->

  
  </div>
  <div v-else>
    <div align="center"> 
      <br/>  
      <br/>
      <br/>
      <br/>
      <br/>
      <h1 >สำหรับผู้ดูแลระบบเท่านั้น !!!</h1>
      <nuxt-link to="/user/user_main"> กลับไปหน้าแรก</nuxt-link>
    
    </div>
 
  </div>
</template>
<script>
export default {
  async asyncData({ $axios }) {
    const users = await $axios.$get("/users");
    const subject = await $axios.$get("/subject");
    const discus = await $axios.$get("/discuss");
    return {  users, subject, discus };
  },
  data() {
    return {
      user:this.$auth.user,
      loggedIn: this.$auth.loggedIn,
      search:'',
      temp:'',
      temp_id:'',
      dialog_a:false,
      dialog_b:false,
      dialog_c:false,
      dialog:false,
      tab:null
    };
  },
  methods: {
    async deluser(id) {
      await this.$axios.$delete("/users/delete", { data: { id: id } });
      await this.$nuxt.refresh();
    },

    async delsub(id) {
      await this.$axios.$delete("/subject/delete", { data: { id: id } });
      await this.$nuxt.refresh();
    },
    
    async deldis(id) {
      await this.$axios.$delete("/discuss/delete", { data: { id: id } });
      await this.$nuxt.refresh();
    },

     async click(x) {
      await alert("you just clicked "+x);
    },

    async logout() {
      await this.$auth.logout();
      this.$router.push("/login/login");
    },
  },
};
</script>