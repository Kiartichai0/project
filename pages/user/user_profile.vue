<template>
<v-col>
    <v-card>
        <v-card-text align="center">
            <v-avatar color="primary" size="128"> 
                <img src="https://picsum.photos/200" alt="avatar"/>
            </v-avatar>
            <br/>
        </v-card-text>
        <v-card-text align="center"><h3> {{u[0].firstname}} {{u[0].lastname}}  </h3> </v-card-text>
        <v-divider class="mx-4"></v-divider>
        <v-card-title>Tonight's availability</v-card-title>
        <v-btn class="ma-5" to="/user/user_main">back</v-btn>
    </v-card>
</v-col>

</template>
<script>
export default {
    async asyncData({ $axios, query }) {
      const u = await $axios.$get(`/users/${query.id}`);
      //const quiz = await $axios.$get(`/quiz/${query.id}`);
      return { u };
    },
    data() {
        return {
        user: this.$auth.user,
        id: this.$route.query.id,
        loggedIn: this.$auth.loggedIn,
        };
    },
    
}
</script>