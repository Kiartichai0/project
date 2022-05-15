<template>
  <div>
    <v-card>
      <v-card-title class="justify-center ma-5"> Admin Login </v-card-title>
      <center>
        <v-form class="col-10" @submit="login">
          <v-text-field label="username" v-model="username" />
          <v-text-field label="password" type="password" v-model="password" />
          <v-btn type="submit"> Login </v-btn>
          <!--v-btn to="/user/user_main"> Login </v-btn-->
          <v-btn to="/user/user_main"> Back </v-btn>
          <br />
          <br />
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
      username: "",
      password: "",
      role: 'admin',
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
        this.$router.push("/admin/admin");
      } catch (e) {
        alert("wrong username or password");
        this.error = e;
        //this.$router.push("/login/login");
      }
    },
  },
};
</script>

