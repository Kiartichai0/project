<template>
  <div>
    <h1>Hello{{users}}</h1>
  </div>
  <!--div class="container">
    <h1>Photos</h1>
    <div class="photos">
      <nuxt-link
        v-for="photo in photos"
        :to="{ path: `/photos/${photo.id}` }"
        :key="photo.id"
      >
        <img :src="photo.download_url" class="photo-item" />
        {{ photo.author }}
      </nuxt-link>
    </div>
  </div-->
</template>
<script>
  export default {
    head() {
      return {
        title: 'Nuxt Fetch API'
      };
    },
    async asyncData({ $axios }) {
      const users = await $axios.$get('/subject');
      return { users };
    }
  };
</script>
