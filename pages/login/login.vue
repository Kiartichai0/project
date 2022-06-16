<template>
  <div align="center"> 
    <v-card class="col-8 my-5">
      <v-card-title class="justify-center col-10 ma-5"> เข้าสู่ระบบ </v-card-title>
        <v-form class=" col-10" @submit="login">
          <v-text-field label="ชื่อผู้ใช้" v-model="username" />
          <v-text-field label="รหัสผ่าน" type="password" v-model="password" />
          <v-btn rounded color="primary" type="submit" class="ma-5"> เข้าสู่ระบบ </v-btn>
          <v-btn rounded class="ma-5" to="/user/user_main"> กลับไปหน้าแรก </v-btn>
          <v-card-text>
            <router-link to="/login/register">
              ลงทะเบียน? 
            </router-link>
          </v-card-text>

        </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login(e) {
      const payload = {
        username: this.username,
        password: this.password,
      };

      e.preventDefault();
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

      } catch (e) {
        alert( "คุณกรอกชื่อผู้ใช้ หรือ รหัสผ่านผิด");
        console.log(e);
      }
    },
  },
};
</script>

