<template>
  <div>
    <v-card align="center">
      <v-card-title class="justify-center ma-5"> Register </v-card-title>
        <v-form class="col-10 justify-center" @submit="register">
          <v-text-field
            label="username"
            :rules="fillRules"
            v-model="username"
            required
          />
          <v-text-field
            type="password"
            :rules="fillRules"
            label="password"
            v-model="password"
            required
          />
          <v-text-field
            type="password"
            :rules="fillRules"
            label="password again"
            v-model="password2"
            required
          />
          <v-select
            :items="items"
            label="Role"
            v-model="role"
            :rules="[(v) => !!v || 'Role is required']"
            required
          ></v-select>

          <v-btn type="submit" class="ma-5"> Register </v-btn>
          <v-btn to="/login/login" class="ma-5"> back </v-btn>

          <router-link to="/login/login">
            <v-card-text> Login? </v-card-text>
          </router-link>
        </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: ["User", "Writer"],
      username: "",
      fillRules: [(v) => !!v || "Can not be empty."],
      password: "",
      password2: "",
      role: "",
      agree: false,
    };
  },
  methods: {
    async register(e) {
      e.preventDefault();
      //await console.log(this.role);

      const payload = {
        username: this.username,
        password: this.password,
        role: this.role,
      };

      if (
        this.username === "" ||
        this.password === "" ||
        this.password2 === "" ||
        this.role == "" ||
        this.password !== this.password2
      ) {
        alert("Please fill information correctly.");
      } else {
        await this.$axios.$post("/register", payload);
        await this.$router.push("/login/login");

        /*try {
          await this.$auth.loginWith("local", {
            data: payload,
          });

          this.$router.push("/user/user_main");
        } catch (e) {
          this.$router.push("/login/register");
        }*/
      }
    },
  },
};
</script>

