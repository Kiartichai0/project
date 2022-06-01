<template>
<div>
  <v-card >
      <br/>
      <v-card class="mx-auto " max-width="80%">

        <v-card-title> 
          {{ dis[0].title}} 
              <v-spacer></v-spacer>

              <v-menu v-if="this.$auth.loggedIn && this.$auth.user.id == dis[0].user.id" :offset-y="true">
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item >
                    <v-btn @click="edit_topic_dialog = !edit_topic_dialog" text> แก้ไข </v-btn>
                  </v-list-item>
                  <v-list-item >
                    <v-btn @click="deltopic()" color="red" text> ลบ </v-btn>
                  </v-list-item>
                </v-list>
              </v-menu>
          </v-card-title>

        <v-card-text><v-divider></v-divider></v-card-text>
        
        <v-card-text> <div v-html="dis[0].description"></div> </v-card-text>
        <v-card-actions>
          <v-list-item class="grow" >
            <v-list-item-avatar color="grey darken-3" icon="mdi-account" >
              <v-img class="elevation-6" alt="" :src = "dis[0].user.avatar"  />

            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title> {{dis[0].user.firstname}} {{dis[0].user.lastname}} </v-list-item-title>
              <v-list-item-title> {{dis[0].date}} </v-list-item-title>
            </v-list-item-content>

          </v-list-item>
        </v-card-actions>
        
        

      </v-card>
      <br/>

      <v-card class="mx-auto" max-width="80%" >
        <v-card-title> เพิ่มคอมเมนต์ </v-card-title>
        <v-card-text>

          <Editor v-model="comment" /> 
          
          <div> <v-btn text color="primary" @click="addcomment()"> ส่ง </v-btn> </div>
        </v-card-text>
      </v-card>

      <br/>

      <v-card class="mx-auto " max-width="80%">
      <section>
      <v-data-table  :headers="head" :items="dis[0].comments" :page.sync="page" :items-per-page="itemsPerPage" hide-default-footer class="elevation-1" @page-count="pageCount = $event" >

        <template #item.date="{ item }">
         <v-card class="mx-auto my-1" >

            <v-card-title >
              <p> {{item}} </p>
              <v-spacer></v-spacer>
              <v-menu :offset-y="true">
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item >
                    <v-btn @click=" comment = item.comment ,comment_id = item.cid" text> แก้ไข </v-btn>
                  </v-list-item>
                  <v-list-item >
                    <v-btn color="red" text> ลบ </v-btn>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-title>

        <v-card-text >
          <div v-html="item.comment"></div>
        </v-card-text>

        <v-card-actions>
          <v-list-item class="grow">
            <v-list-item-avatar color="grey darken-3" icon="mdi-account" >
              <v-img class="elevation-6" alt="" :src = "item.user.avatar"  />

            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title> {{item.user.firstname}} {{item.user.lastname}} </v-list-item-title>
              <v-list-item-title> {{item.date}} </v-list-item-title>
            </v-list-item-content>

            <v-row justify="end">

              <v-icon v-if="thumb" class="mr-1" @click="doSomethings(),thumb = !thumb "> mdi-thumb-up-outline </v-icon>
              <v-icon v-else class="mr-1" @click="doSomethings(),thumb = !thumb"> mdi-thumb-up </v-icon>
              
              <span v-if = " item.like != null " class="subheading mr-2"> {{item.like.length}} </span>
              <span v-else class="subheading mr-2"> 0 </span>
            </v-row>
          </v-list-item>
        </v-card-actions>
      </v-card>

        
        </template>
      
      </v-data-table>
      <div class="text-center pt-2">
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
      </div>
      </section>
    </v-card>
      <br/>

    </v-card>

      <!--dialog แก้ไขหัวข้อ-->
      <v-dialog  v-model="edit_topic_dialog" max-width="400">
        <v-card>
          <v-form @submit="edittopic">
          <br/>
            <h2 align="center"> คำถาม </h2>
              <v-col>
                <v-text-field label="คำถาม" align="center" v-model="title" />
              </v-col>
              <h2 align="center"> คำอธิบาย </h2>
              <br />
              <v-col>
                <Editor v-model="comment" />
              </v-col>
              <br />
              <v-col>
                <v-row class="ma-5 justify-center">
                  <v-btn class="ma-5" type="submit"> Save </v-btn>
                  <v-btn class="ma-5" @click="edit_topic_dialog = !edit_topic_dialog"> Back </v-btn>
                </v-row>
              </v-col>
          </v-form>
        </v-card>
        
    </v-dialog>

    
  </div>
</template>

<script>
  export default {
    async asyncData({ $axios, query }) {
      const dis = await $axios.$get(`/discuss/${query.id}`);
      //const dis = await $axios.$get(`/discuss/8o1db3r1kt`);
      //const idd = await query.id;
      return { dis };
    },
    data(){
      return{
        page: 1,
        pageCount: 0,
        itemsPerPage: 5,
        head:[ {  text:'ล่าสุด',value: 'date'    } ],
        comment:'',
        title:'',
        description:'',
        comment_id:'',
        user: this.$auth.user,
        loggedIn: this.$auth.loggedIn,
        like:0,
        thumb:true,
        edit_topic_dialog:false,
       
      }

    },
    methods:{ 
      async addcomment() {
        const payload = {
          data: {
            id: this.$route.query.id,
            comment: this.comment,
            user: this.user,
            like:[]
          },
        };
        if(this.loggedIn){
            await this.$axios.$post("/addcomments", payload);
            this.comment = '';
            await this.$nuxt.refresh();
        }else{
          alert("จำเป็นต้องเข้าสู่ระบบก่อน");
          this.comment = '';
        }

      },
      async deltopic() {

        await this.$axios.$delete("/discuss/delete",  { data: { id: this.$route.query.id } });
        this.$router.push("/discuss/discuss_main");
      },
      async edittopic() {
        const payload = {
          data: {
            id: this.$route.query.id,
            description: this.description,
            title: this.title,
          },
        };

        await this.$axios.$post("/discuss/delete", payload );
        this.$router.push("/discuss/discuss_main");
      },
      async doSomethings(){
        if(this.thumb){
          await this.like ++;
        }
        else{
          await this.like --;
        }
        
        //await alert("You just clicked!!");
      },
      async doSomethings2(){
        await alert("You just clicked!!");
      },
      
      
    }
  }
  </script>