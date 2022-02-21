<template>
  <div>
    <v-card>
      <v-card-title class="justify-center ma-5"> Login </v-card-title>
      <center>
        <v-form class="col-10" @submit="login">
          <v-text-field label="username" type="email" name="email" v-model="email" />
          <v-text-field label="password" type="password" name="password" v-model="password" />
          <!--v-select :items="items" label="Role"></v-select-->

          <v-btn type="submit"> Login </v-btn>
          <v-btn > Back </v-btn>
          <br />
          <br />
        </v-form>
      </center>
    </v-card>
  </div>
</template>

<script>
export default {
  //middleware: ['logger', 'auth'],
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login(e) {
      e.preventDefault();

      const payload = {
        email: this.email,
        password: this.password,
      };

      try {
        await this.$auth.loginWith("local", {
          data: payload,
        });
        this.$router.push("/sub/");
      } catch (e) {
        this.$router.push("/sub/login");
      }
    },
  },
};
</script>