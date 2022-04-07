<template>
  <section>
    <h1 class="display-1">Rich-Text editor integration By Anamol Soman</h1>
    <Editor v-model="info" />

    <div v-html="info"></div>
  
  </section>
</template>
<script>
import Editor from "../../components/Editor";
export default {
  components: {
    Editor,
  },
  data: () => ({
    info: "My Default Content",
  }),
};
</script>