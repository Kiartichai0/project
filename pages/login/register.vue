<template>
  <div>
    <v-card>
      <v-card-title class="justify-center ma-5"> Register </v-card-title>
      <center>
        <v-form class="col-10 justify-center" @submit="register">
          <v-text-field label="username" v-model="username" />
          <v-text-field type="password" label="password" v-model="password" />
          <v-text-field type="password" label="password again" />
          <v-select :items="items" label="Role" v-model="role"></v-select>

          <v-checkbox label="Do you agree term of service?" />

          <v-btn type="submit"> Register </v-btn>
          <v-btn to="/login/login"> back </v-btn>
          <br />
          <br />
          <router-link to="/login/login">
            <v-card-text> Login? </v-card-text>
          </router-link>
        </v-form>
      </center>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: ["User", "Writer"],
      username: "",
      password: "",
      role: "",
    };
  },
  methods: {
    async register(e) {
      e.preventDefault();
      await console.log(this.role);

      const payload = {
        username: this.username,
        password: this.password,
        role: this.role,
      };

      await this.$axios.$post('/register',payload);

      try {
          
        await this.$auth.loginWith("local", {
          data: payload,
        });

        this.$router.push("/user/user_main");
      } catch (e) {
        this.$router.push("/login/register");
      }
    },
  },
};
</script>

