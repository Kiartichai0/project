<template>
  <div>
    <!--ul v-if="posts && posts.length">
      <li v-for="post of posts">
        <p><strong>{{post.title}}</strong></p>
        <p>{{post.body}}</p>
      </li>
    </ul>

    <ul v-if="errors && errors.length">
      <li v-for="error of errors">
        {{error.message}}
      </li>
    </ul-->
    <h1>{{posts}}</h1>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      posts: [],
      errors: []
    }
  },

  // Fetches posts when the component is created.
  created() {
    axios.get(`localhost:3000/api/users`)
    .then(response => {
      // JSON responses are automatically parsed.
      this.posts = response.data;
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}
</script>