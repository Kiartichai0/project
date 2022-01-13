<script>
import {mapState, mapMutations} from 'vuex';
export default {
  methods: {
    async sayGoodbye(){
      const result = await this.$api.getDate();
      console.warn(result);
      this.putGreeting((await result.json()).date);
    },
    ...mapMutations({
      putGreeting: 'putGreeting'
    })
  },
  computed: {
    ...mapState({
      message: store => store.message
    })
  }

}
</script>

<template>
  <div>
    {{message}}
    <button @click="sayGoodbye">Good Bye</button>
    <nuxt-link to="/">home</nuxt-link>
  </div>
</template>