<template>
<v-col>
    <v-card>
        <v-card-title>              
            <p>  </p>
            <v-spacer></v-spacer>
            <v-menu v-if="id == user.id " :offset-y="true">
            <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </template>

            <v-list>
                <v-list-item >
                    <v-btn @click="edit_dialog = true, avatar = u[0].avatar , first_name = u[0].firstname, last_name = u[0].lastname, bio=u[0].bio" text> แก้ไขข้อมูลส่วนตัว </v-btn>
                </v-list-item>
                <v-list-item >
                    <v-btn @click="change_password = true, pass = u[0].password" text> เปลี่ยนรหัสผ่าน </v-btn>
                </v-list-item>
            </v-list>
            </v-menu>
        </v-card-title>
        <v-card-text align="center">
            <v-avatar color="primary" size="128"> 
                <img v-if = "u[0].avatar != '' " :src="u[0].avatar" alt="avatar"/>
                <span v-else class="white--text text-h1"> {{u[0].firstname[0]}} </span>
            </v-avatar>
            <br/>
        </v-card-text>
        <v-card-text align="center"><h3> {{u[0].firstname}} {{u[0].lastname}}  </h3>  </v-card-text>
        <v-divider class="mx-4"></v-divider>
        <br/>
        <section>  
            <v-row>
                <v-col cols="6">
                    <v-card flat>
                        <v-card-title> คะแนนแบบทดสอบ </v-card-title>
                        <v-card-text >
                            <v-col v-for="i in subject" :key="i.id">
                                <p v-if=" i.score.some((score) => score.user.id == id)" > {{i.title}}: {{i.score[i.score.findIndex((score) => score.user.id == id)].score}} คะแนน</p>
                                <p v-else > {{i.title}}: 0 คะแนน</p>
                            </v-col>
                        </v-card-text>
                    </v-card> 
                </v-col>

                <v-col cols="6">
                    <v-card flat>
                        <v-card-title>  
                            หัวข้อสนทนา
                        </v-card-title>
                        <v-card-text  >
                        <v-col v-for="i in discus" :key="i.id" :hidden="!(i.user.id == id)">
                            <p > <nuxt-link :to="{ path: '/discuss/discuss_room', query: { id: i.id }}">{{i.title}}</nuxt-link> </p>
                        </v-col>                             
                        </v-card-text>
                    </v-card> 
                </v-col>
            </v-row>
           
        </section>
            
        <v-btn class="ma-5" text color="primary" to="/user/user_main"> กลับไปหน้าแรก </v-btn>
    </v-card>

    <!--แก้ไขข้อมูล-->

    <v-dialog v-model="edit_dialog" max-width="800">
        <v-card> 
            <v-card-title class="justify-center">แก้ไขข้อมูลส่วนตัว</v-card-title>  

            <v-container>
                <v-row cols="8">
                    <v-col cols="12" >
                        <v-avatar  size="100">                 
                            <img v-if = "avatar != '' " :src="avatar" alt="avatar"/>
                            <v-icon v-else size="100"> mdi-account-circle-outline </v-icon>
                        </v-avatar>
                        <v-text-field v-model="avatar" label="รูป Profile" ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6">
                        <v-text-field v-model="first_name" label="ชื่อ"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="last_name" label="นามสกุล">  </v-text-field>
                    </v-col>
                    <v-col cols="12">
                    <v-textarea v-model="bio" color="teal" >
                    <template v-slot:label>
                        <div>
                        ประวัติส่วนตัว <small>(optional)</small>
                        </div>
                    </template>
                    </v-textarea>
                </v-col>
                </v-row>

            </v-container>
            <v-card-actions>

                <v-btn text color="primary" class="ma-5" @click="editInfo(), edit_dialog = !edit_dialog"> บันทึก </v-btn>
                <v-btn text class="ma-5" @click="edit_dialog = !edit_dialog"> กลับ </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog  >

    <!--เปลี่ยนรหัสผ่าน-->
    <v-dialog v-model="change_password" max-width="800">
        <v-card>
            <v-card-title class="justify-center">เปลี่ยนรหัสผ่าน</v-card-title>  

            <v-container>
                <v-row cols="8">
                    <v-col cols="12">
                        <v-text-field :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'" counter @click:append="show1 = !show1" label="รหัสผ่านเดิม" v-model="password"></v-text-field>
                        <v-text-field :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" :type="show2 ? 'text' : 'password'" counter @click:append="show2 = !show2" label="รหัสผ่านใหม่" v-model="new_password"></v-text-field>
                    </v-col>
                </v-row>

            </v-container>
            <v-card-actions>
                <v-btn text color="primary" class="ma-5" @click="changePassword(), change_password = !change_password"> บันทึก </v-btn>
                <v-btn text class="ma-5" @click="change_password = !change_password"> กลับ </v-btn>
            </v-card-actions>
        </v-card>

    </v-dialog>
</v-col>

</template>
<script>
export default {
    async asyncData({ $axios, query }) {
      const u = await $axios.$get(`/users/${query.id}`);
      const subject = await $axios.$get("/subject");
      const discus = await $axios.$get("/discuss");
      //const quiz = await $axios.$get(`/quiz/${query.id}`);
      return { u,subject,discus };
    },
    data() {
        return {
        user: this.$auth.user,
        id: this.$route.query.id,
        loggedIn: this.$auth.loggedIn,
        edit_dialog:false,
        avatar:'',
        first_name:'',
        last_name:'',
        bio:'',
        change_password:false,
        pass:'',
        password:'',
        new_password:'',
        show1:false,
        show2:false,
        };
    },
    methods:{
        async editInfo(){
            const payload = {
                data:{
                    id: this.$route.query.id,
                    avatar: this.avatar,
                    firstname: this.first_name,
                    lastname: this.last_name,
                    bio: this.bio
                }
            }
            await this.$axios.$post("/users/update", payload);
            await this.$nuxt.refresh();
        },

        async changePassword(){

            const payload = {
                data:{
                    id: this.$route.query.id,
                    password: this.new_password,
                }
            }

            if(this.password == this.pass){
                await this.$axios.$post("/users/password", payload);
                await this.$nuxt.refresh();


            }else{
                alert('รหัสผ่านผิด');

            }

        },
    }
    
}
</script>