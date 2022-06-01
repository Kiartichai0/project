<template>
  <div v-if="loggedIn && user.role == 'admin'   ">
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
          <v-tab-item v-for="i in 3" :key="i">

              <v-card>
              <v-card-title>
                  <v-text-field  v-model="search"  append-icon="mdi-magnify"  label="ค้นหา"  single-line  hide-details  ></v-text-field>
              </v-card-title>
              <v-data-table v-model="selected" show-select :headers="head[tab]"  :items="chunk[tab]"  :search="search">

                <template v-if="tab == 0" #item.username="{ item }">
                  <nuxt-link :to="{ path: '/login/profile', query: { id: item.id },}"> {{ item.username }} </nuxt-link>
                </template>

                <template v-else-if="tab == 1 " #item.title="{ item }">
                  <nuxt-link :to="{ path: '/user/user_topic', query: { id: item.id },}"> {{ item.title }} </nuxt-link>
                </template>

                <template v-else-if="tab == 2" #item.title="{ item }">
                  <nuxt-link :to="{ path: '/discuss/discuss_room', query: { id: item.id },}"> {{ item.title }} </nuxt-link>
                </template>

              </v-data-table>
              <v-card-text> 
                  <center>
                  <v-btn v-if="selected != '' " width="100%" large color="red lighten-2" text @click="dialog = true"> ลบ </v-btn> 
                  </center>
              </v-card-text>
              </v-card>

          </v-tab-item> 
      </v-tabs-items>
    </v-card>
    <!--dialog แจ้งเตือนลบข้อมูล-->
      <v-dialog  v-model="dialog" max-width="400">
      <v-card>
        <v-card-title>
              <h2>คุณต้องการลบรายการต่อไปนี้ ?</h2>
        </v-card-title>
        <v-card-text>
            <p v-for="j in selected" :key="j.id">- {{j.username}} {{j.title}} <br/> id:{{j.id}} </p>
        </v-card-text>
        <v-card-actions>
          <v-btn  color="red darken-1"  text  @click="deleteItem() ,dialog = false, selected = []"  >  ตกลง  </v-btn>
          <v-btn  color="darken-1"  text  @click="dialog = false">  ยกเลิก  </v-btn>
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
      const chunk = [users,subject,discus];
      return {  users, subject, discus,chunk };
    },
    data() {
      return {
        user:this.$auth.user,
        loggedIn: this.$auth.loggedIn,
        search:'',
        dialog:false,
        tab:null,
        selected:[],
        head:[[{ text: 'Username', value: 'username' }, { text: 'firstname', value: 'firstname' }, { text: 'lastname', value: 'lastname' }, { text: 'ID', value: 'id' }], [{ text: 'Title', value: 'title' }, { text: 'ID', value: 'id' } ], [{ text: 'Title', value: 'title' }, { text: 'ID', value: 'id' } ] ],
      };
    },
    methods: {
      async click(x) {
        await alert("you just clicked "+x);
      },
      async deleteItem() {
        await this.selected.forEach(i => {
            this.$axios.$delete("/users/delete", { data: { id: i.id } });
            this.$axios.$delete("/subject/delete", { data: { id: i.id } });
            this.$axios.$delete("/discuss/delete", { data: { id: i.id } });
            console.log(i.id);
          });
          await this.$nuxt.refresh();
      
      },
    },
  };
</script>