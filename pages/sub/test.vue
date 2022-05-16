<template>
  <div>
    <div v-if="b">
      <v-btn  @click="b=!b"> X </v-btn>
    </div>
    <div v-else>
      <v-btn  @click="b=!b"> Y </v-btn>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      b: false,
    };
  },
};
</script>