<template>
  <div>
    <v-card align="center">
      <v-card-title class="justify-center col-10 ma-5"> Login </v-card-title>
        <v-form class=" col-10" @submit="login">
          <v-text-field label="username" v-model="username" />
          <v-text-field label="password" type="password" v-model="password" />
          <!--v-select :items="items" label="Role" v-model="role"></v-select-->
          <v-btn type="submit" class="ma-5"> Login </v-btn>
          <v-btn class="ma-5" to="/user/user_main"> Back </v-btn>
          <router-link to="/login/register">
            <v-card-text> Register? </v-card-text>
          </router-link>
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
        await this.$router.push("/user/user_main");
        /*if(this.role == "User"){
          this.$router.push("/user/user_main");
        }else{
          this.$router.push("/writer/writer_main");
        }*/


      } catch (e) {
        alert( "wrong username or password or role");
        this.error = e;
        //this.$router.push("/login/login");
      }
    },
  },
};
</script>

