<template>
<div>
  <v-btn class="my-1" to="/discuss/discuss_main" text color="primary" ><v-icon> mdi-keyboard-tab-reverse</v-icon> กลับ  </v-btn>
  <v-card >
      <br/>
      <!--คำถาม-->
      <v-card class="mx-auto " max-width="80%">
        <v-card-title> 
          {{ dis[0].title}} 
              <v-spacer></v-spacer>
              <v-menu v-if="this.$auth.loggedIn && user.id == dis[0].user.id" :offset-y="true">
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item >
                    <v-btn @click = " edit_topic_dialog = !edit_topic_dialog , title = dis[0].title ,description = dis[0].description " text> แก้ไข </v-btn>
                  </v-list-item>
                  <v-list-item >
                    <v-btn @click=" del_topic_dialog = true " color="red" text> ลบ </v-btn>
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

      <!--เพิ่มคอมเมนต์-->
      <v-card class="mx-auto" max-width="80%" >
        <v-card-title> เพิ่มคอมเมนต์ </v-card-title>
        <v-card-text>

          <Editor v-model="comment" /> 
          
          <div> <v-btn text color="primary" @click="addcomment()"> ส่ง </v-btn> </div>
        </v-card-text>
      </v-card>

      <br/>
      <!--คอมเมนต์-->
      <v-card class="mx-auto " max-width="80%">
      <section>
      <v-data-table  :headers="head" :items="dis[0].comments" :page.sync="page" :items-per-page="itemsPerPage" hide-default-footer class="elevation-1" @page-count="pageCount = $event" >

        <template #item.date="{ item }">
         <v-card class="mx-auto my-1" >

            <v-card-title >
              <p>  </p>
              <v-spacer></v-spacer>
              <v-menu v-if="item.user.id == user.id " :offset-y="true">
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item >
                    <v-btn @click="edit_comment_dialog = true, comment_edit = item.comment ,comment_id = item.cid" text> แก้ไข </v-btn>
                  </v-list-item>
                  <v-list-item >
                    <v-btn color="red" @click="del_comment_dialog = true,comment_delete = item " text> ลบ </v-btn>
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

              <v-icon v-if="item.like == null || !item.like.includes(user.data.user.id) " class="mr-1" @click="likeComment(item.cid) "> mdi-thumb-up-outline </v-icon>
              <v-icon v-else class="mr-1" @click="unlikeComment(item.cid)"> mdi-thumb-up </v-icon>
              
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
      <v-dialog v-model="edit_topic_dialog">
        <v-spacer></v-spacer>
          <v-card>
            <v-card-title><h2 align="center"> คำถาม </h2></v-card-title>
            <v-card-title><v-text-field label="คำถาม" v-model="title" /></v-card-title>
            <v-card-text><h2 align="center"> คำอธิบาย </h2></v-card-text>
            <v-card-text><Editor v-model="description" /></v-card-text>
            
            <v-card-action >
              <v-btn text color="primary" class="ma-5" @click="edittopic(), edit_topic_dialog = !edit_topic_dialog"> บันทึก </v-btn>
              <v-btn text class="ma-5" @click="edit_topic_dialog = !edit_topic_dialog"> กลับ </v-btn>
            </v-card-action>
          </v-card>
      </v-dialog>
      <!--dialog แก้ไขcomment-->
      <v-dialog v-model="edit_comment_dialog">
        <v-spacer></v-spacer>
          <v-card>
            <v-card-text></v-card-text>
            <v-card-text><h2 align="center"> คอมเมนต์  </h2></v-card-text>
            <v-card-text><Editor v-model="comment_edit" /></v-card-text>
            
            <v-card-action >
              <v-btn text color="primary" class="ma-5" @click="editcomment(),edit_comment_dialog = false"> บันทึก </v-btn>
              <v-btn text class="ma-5" @click="edit_comment_dialog = false"> กลับ </v-btn>
            </v-card-action>
          </v-card>
        
      </v-dialog>

      <!--dialog ลบcomment-->
      <v-dialog v-model="del_comment_dialog" max-width="400">
        <v-spacer></v-spacer>
          <v-card>
            <v-card-text></v-card-text>
            <v-card-text><h2 align="center"> ตุณต้องการลบคอมเมนต์นี้ ? </h2></v-card-text>
            
            <v-card-action >
              <div align="center">              
                <v-btn text color="red" class="ma-5" @click="delcomment(),del_comment_dialog = false"> ตกลง </v-btn>
                <v-btn text class="ma-5" @click="del_comment_dialog = false"> ยกเลิก </v-btn>
              </div>
            </v-card-action>
          </v-card>
      </v-dialog>
      <!--dialog ลบtopic-->
      <v-dialog v-model="del_topic_dialog " max-width="400">
        <v-spacer></v-spacer>
          <v-card>
            <v-card-text></v-card-text>
            <v-card-text><h2 align="center"> ตุณต้องการลบหัวข้อนี้ ? </h2></v-card-text>
            
            <v-card-action >
              <div align="center">              
                <v-btn text color="red" class="ma-5" @click="deltopic()"> ตกลง </v-btn>
                <v-btn text class="ma-5" @click="del_topic_dialog = false"> ยกเลิก </v-btn>
              </div>
            </v-card-action>
          </v-card>
      </v-dialog>

    
  </div>
</template>

<script>
  export default {
    async asyncData({ $axios, query }) {
      const dis = await $axios.$get(`/discuss/${query.id}`);
      const user = await $axios.$get(`/me`);
      return { dis,user };
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
        comment_edit:'',
        comment_delete:'',
        //user: this.$auth.user,
        loggedIn: this.$auth.loggedIn,
        like:0,
        thumb:true,
        edit_topic_dialog:false,
        edit_comment_dialog:false,
        del_comment_dialog:false,
        del_topic_dialog:false
       
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
      async editcomment() {
        const payload = {
          data: {
            id: this.$route.query.id,
            comment: this.comment_edit,
            cid: this.comment_id,
          },
        };

        await this.$axios.$post("/editcomments", payload);
        await this.$nuxt.refresh();
      },
      async delcomment() {
        const payload = {
          data: {
            id: this.$route.query.id,
            comment: this.comment_delete,
          },
        };

        await this.$axios.$post("/delcomments", payload);
        await this.$nuxt.refresh();
      },
      async deltopic() {

        await this.$axios.$delete("/discuss/delete",  { data: { id: this.$route.query.id } });
        this.$router.push("/discuss/discuss_main");
      },
      async edittopic() {
        const payload = {
          discuss: {
            id: this.$route.query.id,
            description: this.description,
            title: this.title,
          },
        };

        await this.$axios.$post("/editdiscuss", payload );
        await this.$nuxt.refresh();
      },
      async likeComment(x) {

       
        if(this.loggedIn){
            const payload = {
              data: {
                id: this.$route.query.id,
                like: this.$auth.user.id,
                cid: x,
              },
            };
            await this.$axios.$post("/likecomments", payload );
            await this.$nuxt.refresh();
        }
        else{ 
          alert("จำเป็นต้องเข้าสู่ระบบก่อน");
        }

      },
      async unlikeComment(x) {
        const payload = {
          data: {
            id: this.$route.query.id,
            like: this.$auth.user.id,
            cid: x,
          },
        };

        await this.$axios.$post("/unlikecomments", payload );
        await this.$nuxt.refresh();
      },
      
    }
  }
  </script>