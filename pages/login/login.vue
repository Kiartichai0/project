<template>
  <div>
    <v-card>
      <v-card-title class="justify-center ma-5"> Login </v-card-title>
      <center>
        <v-form class="col-10" @submit="login">
          <v-text-field label="username" v-model="username" />
          <v-text-field label="password" type="password" v-model="password" />
          <v-select :items="items" label="Role" v-model="role"></v-select>
          <v-btn type="submit"> Login </v-btn>
          <!--v-btn to="/user/user_main"> Login </v-btn-->
          <v-btn> Back </v-btn>
          <br />
          <br />
          <router-link to="/login/register">
            <v-card-text> Register? </v-card-text>
          </router-link>
          <div class="field">
            <p v-if="error" class="notification is-danger">
              {{ error.message }}
            </p>
          </div>
        </v-form>
      </center>
    </v-card>
  </div>
</template>

<script>
//import mongo from "api/FindDoc";
export default {
  created() {},

  data() {
    return {
      items: ["User", "Writer"],
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
        role: this.role,
      };

      try {
        await this.$auth.loginWith("local", {
          data: payload,
        });

        this.$router.push("/user/user_main");
      } catch (e) {
        alert( "wrong username or password or role");
        this.error = e;
        //this.$router.push("/login/login");
      }
    },
  },
};
</script>

