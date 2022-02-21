<template>
  <div class="container">
      <div v-if="loggedIn">
        <h1>Hello, {{ user.email }}</h1>
        <!--h1>{{subject.title}}</h1-->
        <button  class="button--grey" @click="logout">Logout</button>
      </div>

      <div v-else>
        <nuxt-link to="/sub/login" class="button--grey">Login</nuxt-link>
      </div>

    </div>
</template>

<script>
export default {
  data() {
    return {
      user: this.$auth.user,
      subject: this.$auth.subject,
      loggedIn: this.$auth.loggedIn
    };
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$router.push('/login/login');
    }
  }
};
</script>

<style>
.divider {
  margin: 2em 0;
}

.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>