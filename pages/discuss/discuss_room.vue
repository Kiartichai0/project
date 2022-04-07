<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ id }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: this.$auth.user,
      loggedIn: this.$auth.loggedIn,

      title: this.$route.query.title,
      id: this.$route.query.id,
    };
  },
};
</script>