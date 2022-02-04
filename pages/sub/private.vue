<template>
  <div>
    <h1>THiS IS PRIVATE</h1>

    <nuxt-link to="/sub">Go to Home</nuxt-link>
  </div>
</template>

<script>
export default {
  middleware: ['logger', 'auth']
};
</script>