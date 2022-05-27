<template>
  <div align="center"> 
    <v-card class="col-8 my-5">
      <v-card-title class="justify-center col-10 ma-5"> เข้าสู่ระบบ </v-card-title>
        <v-form class=" col-10" @submit="login">
          <v-text-field label="ชื่อผู้ใช้" v-model="username" />
          <v-text-field label="รหัสผ่าน" type="password" v-model="password" />
          <!--v-select :items="items" label="Role" v-model="role"></v-select-->
          <v-btn rounded color="primary" type="submit" class="ma-5"> เข้าสู่ระบบ </v-btn>
          <v-btn rounded class="ma-5" to="/user/user_main"> กลับไปหน้าแรก </v-btn>
          <v-card-text>
            <router-link to="/login/register">
              ลงทะเบียน? 
            </router-link>
          </v-card-text>
          <!--div class="field">
            <p v-if="error" class="notification is-danger">
              {{ error.message }}
            </p>
          </div-->
        </v-form>
    </v-card>
  </div>
</template>

<script>
//import mongo from "api/FindDoc";
export default {
  created() {},

  data() {
    return {
      //items: ["User", "Writer"],
      username: "",
      password: "",
      role: "",
      error: null
    };
  },
  methods: {
    async login(e) {
      e.preventDefault();
      await console.log(this.role);

      const payload = {
        username: this.username,
        password: this.password,
      };

      try {
        await this.$auth.loginWith("local", {
          data: payload,
        });

        if(this.$auth.user.role == 'User'){
          await this.$router.push("/user/user_main");
        }
        else if(this.$auth.user.role == 'Writer'){
          await this.$router.push("/writer/writer_main");
        }else {
          await this.$router.push("/admin/admin");
        }
        //await this.$router.push("/user/user_main");
        /*if(this.role == "User"){
          this.$router.push("/user/user_main");
        }else{
          this.$router.push("/writer/writer_main");
        }*/


      } catch (e) {
        alert( "คุณกรอกชื่อผู้ใช้ หรือ รหัสผ่านผิด");
        this.error = e;
        //this.$router.push("/login/login");
      }
    },
  },
};
</script>

